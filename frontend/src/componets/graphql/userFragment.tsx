import {gql} from "apollo-boost";

export const userFragment = gql`
    fragment UserInfo on User {
        id
        email
        type
        ccLast4
        shippingAddress {
            city
            country
            line1
            line2
            postal_code
            state
        }
    }
`;