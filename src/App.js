import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
// import Book from './components/Book/Book';
import Header from './components/Header/Header';
import Book from './components/Book/Book';
import NotFound from './components/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import HotelBooking from './components/HotelBooking/HotelBooking';
import PrivateRoute from './PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <Router>
          <Navbar></Navbar>

         <Switch>
       
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/book/:id">
              <Book />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <PrivateRoute path="/hotelBooking">
              <HotelBooking/>
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
            <NotFound/>
            
            </Route>
           
         
        </Switch>
      </Router> 
      </UserContext.Provider>
     
  );
}

export default App;



// import React, { createContext, useState } from 'react';
// import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
// import Home from './components/Home/Home';
// import Login from './components/Login/Login';
// // import Book from './components/Book/Book';
// import Header from './components/Header/Header';
// import Book from './components/Book/Book';
// import NotFound from './components/NotFound/NotFound';

// export const UserContext = createContext();

// function App() {
//   const [loggedInUser, setLoggedInUser] = useState({})
//   return (
    
    
      
//       <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
//          <Router>
//              <Header/>

//          <Switch>
       
//             <Route path="/home">
//               <Home />
//             </Route>
//             <Route path="/book:id">
//               <Book />
//             </Route>
//             <Route path="/Login">
//               <Login/>
//             </Route>
            
//             {/* <PrivateRoute path="/Hotel">
//               <Hotel/>
//             </PrivateRoute> */}
//             <Route exact path="/">
//               <Home />
//             </Route>
//             <Route path="*">
//             <NotFound/>
//             </Route>
//             <Route exact path="/">
//               <Home />
//             </Route>
//             <Route path="/login">
//               <Login />
//             </Route>
         
//       </Switch>
//       </Router> 
//   </UserContext.Provider>
     
//   );
// }

// export default App;

// import React from 'react';
// // import { Link } from 'react-router-dom';
// import './Header.css';
// // import header from '../../images/header.png';
// // import logo from '../../images/icons/logo.png';
// import Navbar from '../Navbar/Navbar';
// // import Cards from '../Cards/Cards';


// const Header = () => {
  
//     return (
//         // <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${header})` }} className="header">
//     <div>
//         <Navbar></Navbar>
         
//     </div>
//     );
// };

// export default Header;


