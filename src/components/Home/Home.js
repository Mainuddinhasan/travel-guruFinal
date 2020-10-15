import React, { useState } from 'react';
import './Home.css'
import header from '../../images/header.png';
import { Link } from 'react-router-dom';
import Book from '../Book/Book';
import travelPlaceData from '../TravelData/TravelData';

const Home = () => {
   const [tourPlace,setTourPlace]=useState(travelPlaceData)
    console.log(tourPlace)
   const [item, setItem] = useState([]);
    console.log(item)
    const handleTravelPlace = (travelPlace) => {
    setItem(travelPlace);
    }
    
    return (
        // <div className="backgroundImage d-flex  mb-3 align-items-center">
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${header})` }} className="header">
         <div className="banner-container">
         <div className="description">
           <h2 className="TravelTitle">{item.TravelTitle}</h2>
           <p>{item.TravelBody}</p>
            <Link to={`/Book/${item.id}`}><button className="btn">{item.TravelTitle}</button></Link>
         </div>
        <div className="image-container">
         {tourPlace.map(travelPlace =>
           <img  className="image" onClick={() => handleTravelPlace(travelPlace)}  onLoad={() => handleTravelPlace(travelPlace)} src={travelPlace.img} alt="" />
            )}
        </div>
         </div>
       
        </div>
    );
};

export default Home;


