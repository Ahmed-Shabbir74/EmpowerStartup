import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/auth/userVerification/login';
import Signup from './pages/auth/userVerification/signup';
import Dashboard from './pages/general/dashboard';
import ForgotPassword from './pages/auth/reset-password/forgotPassword';
import UpdatePassword from './pages/auth/reset-password/updatePassword';

import FourZeroFour from "./pages/404"
import ReviewCandidateApplications from './pages/admin/reviewCandidateApplications';
import ApplyAsCandidate from './pages/user/applyAsCandidate';
import DonorPage from './pages/general/donor';
import Placeorder from './pages/user/placeorder';
import Inputinventory from './pages/user/Inputinventory';
import DonateMoneyPage from './pages/general/donatemoney'; 

import { AuthProvider } from './contexts/authContext/authContext';
import GeneralProtectedRoute from './components/ProtectedRouteComponents/GeneralProtectedRoutes';
import AdminProtectedRoute from './components/ProtectedRouteComponents/AdminProtectedRoutes';

//import VoterProtectedRoute from './components/ProtectedRouteComponents/VoterProtectedRoutes';
//import CandidateProtectedRoute from './components/ProtectedRouteComponents/CandidateProtectedRoutes';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<GeneralProtectedRoute elementBody={<Dashboard />} />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/reset-password/new-password" element={<UpdatePassword />} />
        <Route path="*" element={<FourZeroFour />}/>
        
        
        
        <Route path="/review-candidate-applications" element={<AdminProtectedRoute elementBody={<ReviewCandidateApplications />} />} />
        <Route path="/apply" element={<GeneralProtectedRoute elementBody={<ApplyAsCandidate />} />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/placeorder" element={<Placeorder />} />
        <Route path="/Inputinventory" element={<Inputinventory />} />
        <Route path="/donatemoney" element={<DonateMoneyPage />}></Route>
        {/* <Route path="/donatemoney" component={DonateMoneyPage} /> */}
      
      
    
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
