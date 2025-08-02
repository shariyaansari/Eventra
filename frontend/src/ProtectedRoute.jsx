import {Navigate} from "react-router-dom";
import CookieAuthCheck from "./components/useCookieAuthCheck";
import React from "react";
export default function ProtectedRoute({children}) {
    const {isAuthenticated,authChecked} = CookieAuthCheck();
    if (!authChecked) return <div>Checking auth...</div>;
    return isAuthenticated ? children : <Navigate to="/login"/>;
}