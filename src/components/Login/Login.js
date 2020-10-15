import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';

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
   
   
const handleLogin = (event) => {
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
    
 
    return (
        <div>
        
        <form onSubmit={handleLogin} className="login-form"> 
          <h1>Travel Guru Login Form</h1>
          {/* <input className="form-control" onBlur={handleBlur} type="text" name="email"  placeholder=" User-name or Email address" required/> */}
          <br/><br/>
          <input className="form-control" onBlur={handleBlur} type="text" name="email"  placeholder=" User-name or Email address" required/>
          <br/><br/><br/>
          
          <input className="form-control" onBlur={handleBlur} type="password" name="password"  placeholder="Enter Your Password" required/>
          <br/><br/><br/>
          <input className="login-btn" type="submit" />
          <br/>
          <small>Do you have an Account? <Link to="/signup">Create an Account</Link> </small>
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



// import React, { useContext } from 'react';
// import { Link, useHistory, useLocation } from 'react-router-dom';
// import { UserContext } from '../../App';
// import * as firebase from "firebase/app";
// import "firebase/auth";
// import './Login.css'
// import firebaseConfig from './firebase.config';
// const Login = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//     const history = useHistory();
//     const location = useLocation();
//     const { from } = location.state || { from: { pathName: "/" } };
//     const handleGoogleLogin = ()=>{
//               firebase.initializeApp(firebaseConfig);
//               var provider = new firebase.auth.GoogleAuthProvider();
      
//           firebase.auth().signInWithPopup(provider).then(function(result) {
//               var token = result.credential.accessToken;
              
//               var user = result.user;
//               console.log(user)
              
//               // ...
//             }).catch(function(error) {
//               var errorCode = error.code;
//               var errorMessage = error.message;
//               var email = error.email;
//               var credential = error.credential;
//               // ...
//             });
      
//           }

//     const handleInputLogin = (vent) => {
//         let FormValidLogin = true;
//         if (vent.target.name === "email") {
//             FormValidLogin = /\S+@\S+/.test(vent.target.value);
//         }
//         if (vent.target.name === "password") {
//             const PasswordValid = vent.target.value.length > 5;
//             const PasswordNumberValid = /\d{1}/.test(vent.target.value);
//             FormValidLogin = PasswordValid && PasswordNumberValid;
//         }
//         if (FormValidLogin) {
//             const newUserInfo = { ...loggedInUser };
//             newUserInfo[vent.target.name] = vent.target.value;
//             setLoggedInUser(newUserInfo);
//         }
//     }

//     const handleSubmitLogin = (vent) => {
//         if (loggedInUser.email && loggedInUser.password) {
//             firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
//                 .then(response => {
//                     const newUserInfo = { ...loggedInUser };
//                     newUserInfo.error = "";
//                     newUserInfo.success = true;
//                     setLoggedInUser(newUserInfo);
//                     history.replace(from);
//                 })
//                 .catch(function (error) {
//                     const newUserInfo = { ...loggedInUser };
//                     newUserInfo.error = error.message;
//                     console.log(error.message);
//                     newUserInfo.success = false;
//                     setLoggedInUser(newUserInfo)
//                 });

//         }
//         vent.preventDefault();
//     }
//     return (
      
//       <div>
        
//               <form onSubmit="" className="login-form"> 
//                 <h1>Travel Guru Login Form</h1>
//              <input className="form-control" type="text" name="email"  placeholder=" User-name or Email address" required/>
//               <br/><br/><br/>
                
//              <input className="form-control" type="password" name="password"  placeholder="Enter Your Password" required/>
//                  <br/><br/><br/>
//                  <input className="login-btn" type="submit" />
//                  <br/>
//                 <small>Do you have an Account? <Link>Create an Account</Link> </small>
//                  <br/><br/>
               
//              </form>
//              <div >
//                   <button className="default-login-btn" >Continue With Facebook</button>
                  
//                   <button onClick={handleGoogleLogin} className="default-login-btn">Continue With Google</button>
//                </div>
             
//            </div> 

         
        
//     );
// };

// export default Login;




