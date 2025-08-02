import React from 'react';
import {createBrowserRouter ,RouterProvider,} from "react-router-dom";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import OAuthLogin from "./OAuthLogin";
import Logout from "./Logout";
import App from "./App";

const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/", element: <App /> },
    { path: "/oauth-login", element: <OAuthLogin /> },
    { path: "/logout", element: <Logout /> },
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
    }
});

export default function AppRouter() {
    // enclose anything you want to protect in <ProtectedRoute></ProtectedRoute>
    return <RouterProvider router={router} />;
}