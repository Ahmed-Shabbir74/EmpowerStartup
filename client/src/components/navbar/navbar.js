import React from 'react';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/authContext/authContext";
import { GetUser } from '../../apis/general/getuserdetailsAPI';

import '../../styles/navbar/navbar.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Navbar = () => {
  const {logout}=useAuth();
  const [userDetails,setUserDetails]=useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await GetUser(
          localStorage.getItem("jwtToken")
        );
        console.log(fetchedUser.data.user);
        setUserDetails(fetchedUser.data.user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!userDetails) {
    return <div>
  
  <ul className="nav-list">
       
            <li><Link to="/" className="nav-link">Dashboard</Link></li>
            <li><Link to="/donor" className="nav-link">DONOR</Link></li>
        
        </ul>




    </div>;
  }  
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link">Dashboard</Link></li>
      
        {userDetails.userType === 'Applicant' && (
          <>
            <li><Link to="/apply" className="nav-link">Apply For Startup</Link></li>
         
          </>
        )}
         {userDetails.userType === 'candidate' && (
          <>
            <li><Link to="/Inputinventory" className="nav-link">Input Inventory</Link></li>
            <li><Link to="/placeorder" className="nav-link">Place Order</Link></li>
            
          </>
        )}

        
        {userDetails.userType === 'admin' && (
          <>
            
            <li><Link to="/review-candidate-applications" className="nav-link">Startup Applications</Link></li>
            
          </>
        )}
      </ul>
      <div className="user-details">
        <LazyLoadImage
          alt="User"
          src={"/uploads/" + userDetails.profilePic}
          effect="blur"
          style={{ borderRadius: '50%' }}
          width={40} 
          height={40} 
        />
        <span className="username">{userDetails.username}</span>
        <button className="signout-button" onClick={logout}>Sign Out</button>
      </div>

    </nav>
  );
};

export default Navbar;