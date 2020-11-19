import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Mutation } from "react-apollo";
import {gql} from "apollo-boost";

import {userFragment} from "../componets/graphql/userFragment";
import { LoginUserMutation, LoginUserMutationVariables } from "../schemaTypes";
import {meQuery} from "../componets/graphql/me";


const loginMutation = gql`
mutation LoginUserMutation($email: String!, $password: String!){
  login(email: $email, password: $password){
      ...UserInfo
  }
}
${userFragment}

`;

const LoginView = () =>{
    const [form, setValues] = useState({
        email: "",
        password: "",
    })
    const history = useHistory();

const handleChange:any = (e:any)=>{
    const {name, value} = e.target;
    setValues(prevState => ({...prevState, [name]:value}));
};


return(<Mutation<LoginUserMutation, LoginUserMutationVariables>
    update={(Cache, {data}) =>{
        if(!data ||!data.login){
            return;
        }
        Cache.writeQuery({
            query: meQuery,
            data: {me: data.login}
        });
    }}
    mutation={loginMutation}>
        {mutate=>(
            <div 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                         }}>
             <div>
                 <input value={form.email}
                 type="text"
                 placeholder="email"
                 onChange={handleChange}
                 name="email"/>
             </div>
             <div
                style={{
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "center",
                   justifyContent: "center"
                       }}>
                <input value={form.password}
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"/>
                <button type="button" onClick={async ()=> {
                    const response = await mutate({
                        variables: form
                    });
                    console.log(response)
                    history.push("/account")
                }}>Login</button>
                    <b>
                      Don't have an account? <br/>
                      Register <a href='/register'  className='button7'> here
                </a></b>
            </div>
        </div>)}
        </Mutation>

    )
}
export default LoginView