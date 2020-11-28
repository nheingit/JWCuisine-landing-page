import React, {Fragment, useState} from "react";
import { useHistory } from "react-router-dom";
import { Mutation } from "react-apollo";
import {gql} from "apollo-boost";
import {makeStyles} from '@material-ui/core/styles';

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
const useStyles = makeStyles((theme)=> ({
  backGround:{
    minHeight: '100vh',
    backgroundImage:`url(${process.env.PUBLIC_URL+ "./assets/bg.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize:"cover",
    position: "relative",
  },
}));

const LoginView = () =>{
    const classes = useStyles();
    const [form, setValues] = useState({
        email: "",
        password: "",
    })
    const history = useHistory();

const handleChange:any = (e:any)=>{
    const {name, value} = e.target;
    setValues(prevState => ({...prevState, [name]:value}));
};
//provides logic to login user and provides form fields
return(
    <Mutation<LoginUserMutation, LoginUserMutationVariables>
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
            <div className={classes.backGround}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                         }}>
             <div>
                 <input value={form.email}
                 type="text"
                 required
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
                required
                placeholder="password"
                onChange={handleChange}
                //Logs in user if they push enter
                onKeyDown={async (event: React.KeyboardEvent<HTMLInputElement>) => {
                  if(event.keyCode === 13){
                     const response = await mutate({
                            variables: form
                               });
                     console.log(response)
                     history.push("/account")       
                     }
                }}
                // button to login user
                name="password"/>
                <a  href="#" className="button7" onClick={async (event)=> {
                    event.preventDefault();
                    const response = await mutate({
                        variables: form
                    });
                    console.log(response)
                    history.push("/account")
                }}>LOGIN</a>
            </div>
        </div>
        )}
        </Mutation>

    )
}
export default LoginView