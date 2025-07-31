import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import OAuthLogin from "./OAuthLogin";
import Logout from "./Logout";
import App from "./App";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/" element={<App />}/>
                <Route path="/oauth-login" element={<OAuthLogin/>}> </Route>
                <Route path="/logout" element={<Logout/>}> </Route>
            </Routes>
        </Router>
         // use protected route on which page you want to secure<ProtectedRoute></ProtectedRoute>
    );
}

export default AppRouter;