import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

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
      <form method="POST" action="http://localhost:8282/billing">
           <button type="submit">Manage billing</button>
      </form>
</div> 
)
export default UserProfile;