import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';
import useScript from "../hook/useScript";
import Stripe from "stripe";
const User = ()=>{
  const {user, isAuthenticated, isLoading} = useAuth0();
  if(isLoading){
    return <div>Loading....</div>
  }

  return(
    isAuthenticated &&(
      <div>
        <img src={user.picture} alt={user.name}/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  )

}


const UserProfile = ()=>(
  <div>
    {User}
    
      <Link to="/" replace>Home</Link>

     

     

           <button onClick={console.log("hello billing")}>Manage billing</button>
      
</div> 
)
export default UserProfile;