import React from 'react'
import { Routes, Route,BrowserRouter } from "react-router-dom";
import { LoginScreen } from '../Components/LoginScreen';


import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
  return (
    <BrowserRouter>
    
    <Routes>
       
        <Route path="/Login" element={<LoginScreen />} />
        
        <Route path="/*" element={
        <PrivateRoute>

         <DashboardRoutes />

        </PrivateRoute>
        
        
        }/>
      </Routes>
    </BrowserRouter>
  )
}
