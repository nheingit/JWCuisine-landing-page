import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as argon2 from "argon2";
import { stripe } from "./stripe";

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

     createSubscription:async (_, {source, ccLast4}, {req})=>{
        if(!req.session || !req.session.userId){
            throw new Error("not authenticated");
        }
        const user = await User.findOne(req.session.userId);

        if(!user){
            throw new Error(); // should not happen as there is no way to delete users
        }
        
        let stripeId = user.stripeId
        if(!stripeId){
        const customer =  await stripe.customers.create({
            email: user.email,
            source,
            
        });
        stripeId = customer.id
        
        } else {
            await stripe.customers.update(stripeId, {
                source
            });
        }

        const subscription = await stripe.subscriptions.create({
            customer: stripeId,
            items: [{
                plan: process.env.STRIPE_SUBSCRIPTION
            }]
        })
        
        user.priceId = subscription.id;
        user.stripeId = stripeId;
        user.ccLast4  = ccLast4;
        user.type = "paid";
        await user.save();
        return user;
        

        },


      changeCreditCard:async (_, {source, ccLast4}, {req})=>{
        if(!req.session || !req.session.userId){
            throw new Error("not authenticated");
        }
        const user = await User.findOne(req.session.userId);

        if(!user || !user.stripeId || user.type !== "paid"){
            throw new Error();
        }

        await stripe.customers.update(user.stripeId, {source});

        user.ccLast4 = ccLast4

        await user.save();
        return user;
        

        },

        //TODO: Add functionality to end subscription
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
