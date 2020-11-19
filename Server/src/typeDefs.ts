import {gql} from 'apollo-server-express';

export const typeDefs = gql`
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
type Query {
    me: User
}
type Mutation{
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createSubscription(source: String!, ccLast4: String!, shippingAddress: ShippingAddressInput!): User
    changeCreditCard(source: String!, ccLast4: String!, shippingAddress: ShippingAddressInput!):User
    cancelSubscription: User
    logout: Boolean
    
}
`;