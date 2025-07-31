import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import LoginPage from "./Login";
import HomePage from './HomePage';
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "./Register";
import OAuthLogin from "./OAuthLogin";
import Logout from "./Logout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                <Route path="/oauth-login" element={<OAuthLogin/>}> </Route>
                <Route path="/logout" element={<Logout/>}> </Route>

                //enclose any page you want to protect with protected route
            </Routes>


        </Router>
    );
}

export default App;
