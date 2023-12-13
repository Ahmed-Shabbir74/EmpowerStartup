// Import necessary dependencies
import React from 'react';
import Navbar from '../../components/navbar/navbar';
import { ToastContainer } from 'react-toastify';

const Card = ({ children }) => {

  const cardStyle = {
    width: '40%',
    border: '2px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    marginLeft: '350px',
    marginTop: '150px',
  };

  
  return <div style={cardStyle}>{children}</div>;
};


export default function DonateMoneyPage() {

  const handleUploadReceipt = () => {

    alert('Upload Receipt functionality will be implemented here.');
  };
 
  return (
    <div>
    
      <Navbar />
      <ToastContainer />

     
      <Card>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2>Account Details</h2>
          <p>EasyPaisa: 0303-7389996</p>
          <p>JazzCash: 0303-7389996</p>
          <p>Bank Account(SADA PAY): 0303-7389996</p>

    
          <button
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
            onClick={handleUploadReceipt}
          >
            Upload Payment Receipt
          </button>
        </div>
      </Card>
    </div>
  );
}
