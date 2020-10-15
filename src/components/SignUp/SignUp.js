import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";

import { UserContext } from '../../App';
import firebaseConfig from '../Login/firebase.config';

const Login = () => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathName: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const GoogleProvider= new firebase.auth.GoogleAuthProvider();
const FacebookProvider = new firebase.auth.FacebookAuthProvider();
  
// Google
const handleGoogleLogin = () => {
  firebase.auth().signInWithPopup(GoogleProvider).then(function (result) {
      var { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      history.replace(from);
  })
      .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
}
// facebook
const handleFacebookLogin = () => {
  firebase.auth().signInWithPopup(FacebookProvider).then(function (result) {
      var { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      history.replace(from);

      // ...
  }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
  });
}

// validation
  const handleBlur = (e) => {
    // console.log(e.target.value,e.target.value)
    let formValidLogin = true;
    if (e.target.name === "email") {
        formValidLogin = /\S+@\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
        const passwordValid = e.target.value.length > 5;
        const passwordNumberValid = /\d{1}/.test(e.target.value);
        formValidLogin = passwordValid && passwordNumberValid;
    }
    if (formValidLogin) {
        const newUserInfo = { ...loggedInUser };
        newUserInfo[e.target.name] = e.target.value;
        setLoggedInUser(newUserInfo);
    }
  }
   
   
const handleSubmitLogin = (event) => {
  if (loggedInUser.email && loggedInUser.password) {
      firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
          .then(response => {
              const newUserInfo = { ...loggedInUser };
              newUserInfo.error = "";
              newUserInfo.success = true;
              setLoggedInUser(newUserInfo);
              history.replace(from);
          })
          .catch(function (error) {
              const newUserInfo = { ...loggedInUser };
              newUserInfo.error = error.message;
              console.log(error.message);
              newUserInfo.success = false;
              setLoggedInUser(newUserInfo)
          });

  }
  event.preventDefault();
}
const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log("Update successful")
    }).catch(function (error) {
        console.log(error)
    });
}
    
 
    return (
        <div>
        
        <form onSubmit={handleSubmitLogin} className="login-form"> 
          <h1>Create a new account</h1>
          <input className="form-control" onBlur={handleBlur} type="text" name="name"  placeholder=" Enter Your First Name" required/>
          <br/><br/>
          <input className="form-control" onBlur={handleBlur} type="text" name="name"  placeholder="Enter Your Last Name " required/>
          <br/><br/>
         
          <input className="form-control" onBlur={handleBlur} type="text" name="email"  placeholder="Enter your Email address" required/>
          <br/><br/>

          <input className="form-control" onBlur={handleBlur} type="password" name="password"  placeholder="Enter Your Password" required/>
          <br/><br/>
          
          <input className="form-control" onBlur={handleBlur} type="password" name="password"  placeholder="Confirm Your Password" required/>
          <br/><br/>

          <input className="login-btn" type="submit" />
          <br/>
          <center>Already have an Account? <Link to="/login">Login</Link> </center>
          <br/><br/>
         
        </form>
        <div >
            <button onClick={handleFacebookLogin} className="default-login-btn" >Continue With Facebook</button>
            
            <button onClick={handleGoogleLogin} className="default-login-btn">Continue With Google</button>
        </div>
        <p style={{ color: 'red' }}>{loggedInUser.error}</p>
        {loggedInUser.success && <p style={{ color: 'green' }}>Login successfully</p>}
    </div> 
    )
};

export default Login;


