import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as argon2 from "argon2";
import { stripe } from "./stripe";
import zipCodeChecker from "./zipCodeChecker";

export const resolvers: IResolvers = {
 Query:{
     me: (_, __, {req})=>{
         if(!req.session.userId){
             return null;
         }
         return User.findOne(req.session.userId);
     }
 },
  
 Mutation:{
     register: async (_, {email, password})=>{
       const hashedPassword = await argon2.hash(password);
       await User.create({
            email,
            password: hashedPassword
        }).save();
        return true;
     },
     login: async (_, {email, password}, {req})=>{
         const user = await User.findOne({where: {email}});
         if(!user){
             return null;
         }
         const valid = await argon2.verify(user.password, password);
         if(!valid){
             return null;
         }

         req.session.userId = user.id;

         return user;
     },

     createSubscription:async (_, {source, ccLast4, shippingAddress}, {req})=>{
        if(!req.session || !req.session.userId){
            throw new Error("not authenticated");
        }
        const user = await User.findOne(req.session.userId);

        if(!user){
            throw new Error(); // should not happen as there is no way to delete users
        }
        // TODO: Don't create subscription if not in zipcode
        if(!zipCodeChecker(shippingAddress.postal_code)){
            return new Error("invalid zipcode, we only serve San Antonio currently")
        }
        let postalCode = user.postalCode;
        let stripeId = user.stripeId
        if(!stripeId){
        const customer =  await stripe.customers.create({
            email: user.email,
            source,
            address: {
                    city: shippingAddress.city,
                    line1: shippingAddress.line1,
                    line2: shippingAddress.line2,
                    postal_code: shippingAddress.postal_code,
                    state: shippingAddress.state
                }

        });
        postalCode = customer.address!.postal_code
        stripeId = customer.id
        
        } else {
            await stripe.customers.update(stripeId, {
                source,
                address: {
                    city: shippingAddress.city,
                    line1: shippingAddress.line1,
                    line2: shippingAddress.line2,
                    postal_code: shippingAddress.postal_code,
                    state: shippingAddress.state
                }
            }).then(stripeCustomer => {
                postalCode = stripeCustomer.address!.postal_code
            });
        }
        
        const subscription = await stripe.subscriptions.create({
            customer: stripeId,
            items: [{
                plan: process.env.STRIPE_SUBSCRIPTION
            }]
        })
        
        user.postalCode = postalCode;
        user.priceId = subscription.id;
        user.stripeId = stripeId;
        user.ccLast4  = ccLast4;
        user.type = "paid";
        console.log(user);
        await user.save();
        return user;
         
        

        },


      changeCreditCard:async (_, {source, ccLast4, shippingAddress}, {req})=>{
        
        if(!req.session || !req.session.userId){
            throw new Error("not authenticated");
        }
        const user = await User.findOne(req.session.userId);

        if(!user || !user.stripeId || user.type !== "paid"){
            throw new Error();
        }
        let postalCode = user.postalCode;
        //TODO: Create error if postal code isnt in valid area

        await stripe.customers.update(user.stripeId, {
            source,
            address: {
                    city: shippingAddress.city,
                    line1: shippingAddress.line1,
                    line2: shippingAddress.line2,
                    postal_code: shippingAddress.postal_code,
                    state: shippingAddress.state
                }
             }).then(stripeCustomer => {
                postalCode = stripeCustomer.address!.postal_code
            });
;
        user.postalCode = postalCode;
        user.ccLast4 = ccLast4

        await user.save();
        return user;
        

        },

    cancelSubscription: async(_, __, {req}) =>{
      if(!req.session || !req.session.userId){
            throw new Error("not authenticated");
        }
        const user = await User.findOne(req.session.userId);

        if(!user || !user.stripeId || user.type !== "paid"){
            throw new Error("no subscription to cancel");
        }

        const stripeCustomer = await await stripe.customers.retrieve(user.stripeId);

        const customerSubscription = await stripe.subscriptions.retrieve(user.priceId);
        
        await stripe.subscriptions.del(customerSubscription.id);

        if(!stripeCustomer.deleted){
            await stripe.customers.deleteSource(user.stripeId, stripeCustomer.default_source as string)
        }

        user.type= "free-trial";
        await user.save();

        return user;
         }
    }
}
