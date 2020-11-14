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

     createSubscription:async (_, {source}, {req})=>{
        if(!req.session || !req.session.userId){
            throw new Error("not authenticated");
        }
        const user = await User.findOne(req.session.userId);

        if(!user){
            throw new Error(); // should not happen as there is no way to delete users
        }

        const customer =  await stripe.customers.create({
            email: user.email,
            source,
            
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{
                plan: "price_1HmAzHJIQLh7k5Y6ZNUmI5q4"
            }]
        })
        
        user.priceId = subscription.id;
        user.stripeId = customer.id;
        user.type = "paid";
        await user.save();
        return user;
        

        }
    }
}