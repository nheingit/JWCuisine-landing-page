import {gql} from "apollo-boost";
import {userFragment} from "./userFragment"

export const meQuery = gql`
query MeQuery{
    me {
        ...UserInfo
        }
}
${userFragment}
`;