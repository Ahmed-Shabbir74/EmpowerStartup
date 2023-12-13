// DonorPage.js
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'; 

export default function DonorPage() {
  // Implement your donor page logic here



  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div style={{ marginTop: '70px', textAlign: 'center' }}>
        <h4>"Together, we can make a difference. Your donation is a powerful force for positive change.".</h4>
        {/* Add images of charity below */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={require('./3.png')} alt="Charity Image 1" style={{ width: '300px', margin: '10px' }} />
          <img src={require('./4.png')} alt="Charity Image 2" style={{ width: '300px', margin: '10px' }} />
          <img src={require('./5.jpg')} alt="Charity Image 2" style={{ width: '300px', margin: '10px' }} />
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' ,color:'black' }}>
      <Link to="/donatemoney" className="btn btn-outline-success" >
          Donate Money
        </Link>
      </div>
    </div>
  );
}
