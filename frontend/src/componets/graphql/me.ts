import {gql} from "apollo-boost";
export const meQuery = gql`
query MeQuery{
    me {
    email
    id
    type
        }
}
`;