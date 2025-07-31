import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import OAuthLogin from "./OAuthLogin";
import Logout from "./Logout";

function HomePage() {
//routes
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

export default HomePage;