import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHomePage from '../pages/AdminHomePage';
import ApplicationFormPage from '../pages/ApplicationFormPage';
import CreateTripPage from '../pages/CreateTripPage';
import HomePage from '../pages/HomePage';
import ListTripsPage from '../pages/ListTripsPage';
import LoginPage from '../pages/LoginPage';
import TripDetailsPage from '../pages/TripDetailsPage';

function Router() {
  //console.log(props.listName)
    
  return (
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<HomePage />} />                
            <Route path="/trips/list" element={<ListTripsPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/trips/application" element={<ApplicationFormPage/>} />
            <Route path="/admin/trips/list" element={<AdminHomePage/>} />
            <Route path="/admin/trips/create" element={<CreateTripPage/>} />
            <Route path="/admin/trips/:id" element={<TripDetailsPage />} />
            
        </Routes>
    </BrowserRouter>    
  );
}
export default Router;