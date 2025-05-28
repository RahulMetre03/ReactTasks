import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js';
import PrincipalDashBoard from './components/dashboard.js';
import PrivateRoute from './components/PrivateRoute';
import  StudentDashBoard  from './components/studentdashboard.js';
import  TeacherDashBoard  from './components/teacherdashboard.js';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route 
                    path="/principaldashboard" 
                    element={
                        <PrivateRoute>
                            <PrincipalDashBoard />
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/studentdashboard" 
                    element={
                        <PrivateRoute>
                            <StudentDashBoard />
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/teacherdashboard" 
                    element={
                        <PrivateRoute>
                            <TeacherDashBoard />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
