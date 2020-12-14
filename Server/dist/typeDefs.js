"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
type User {
    id: ID!
    email: String!
    type: String!
    ccLast4: String
    postalCode: String
    shippingAddress: [ShippingAddress]
}
type ShippingAddress{
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
}
input ShippingAddressInput {
    city: String
    country: String
    line1: String
    line2: String
    postal_code: String
    state: String
}
input FoodDishInput{
    dishOne: String
    dishTwo: String
    dishThree: String
    dishFour: String
}
type Query {
    me: User
}
type Mutation{
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createSubscription(source: String!, ccLast4: String!, shippingAddress: ShippingAddressInput!): User
    createSubscriptionFour(source: String!, ccLast4: String!, shippingAddress: ShippingAddressInput!): User
    addDishToSubscription(foodDishData: FoodDishInput!): User
    changeCreditCard(source: String!, ccLast4: String!, shippingAddress: ShippingAddressInput!):User
    cancelSubscription: User
    logout: Boolean
    
}
`;
//# sourceMappingURL=typeDefs.js.map