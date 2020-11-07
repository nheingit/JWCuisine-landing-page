import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as argon2 from "argon2";

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
     }
 }
}