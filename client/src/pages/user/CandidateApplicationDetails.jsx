// CandidateApplicationDetails.jsx
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CandidateApplicationDetails = ({ application }) => {
  return (
    <div>
      <h3>Candidate Application Details</h3>
      <p>User CNIC: {application.cnic}</p>
      <p>Username: {application.username}</p>
      <p>Home address: {application.UserAddress}</p>
      <p>Startup address: {application.StartupAddress}</p>
      {/* <p>startup name: {application.partyName}</p> */}
      <p>Startup description: {application.StartupDesc}</p>
      <p>Startup type: {application.Startuptype}</p>
      {/* Displaying the image */}

      {/* <p>CNIC Front Picture: <img src={require(application.CNICFront)} alt="CNIC Front" /></p> */}
      {/* <img src={application.CNICFront} alt="CNIC Back" onError={(e) => console.error('Image load error:', e)} /> */}
      <LazyLoadImage
          alt="User"
          src={ application.CNICFront}
          effect="blur"
          style={{ borderRadius: '50%' }}
          width={40} 
          height={40} 
        />



      {/* Add more details based on your application schema */}
    </div>
    
  );
 
};

export default CandidateApplicationDetails;
