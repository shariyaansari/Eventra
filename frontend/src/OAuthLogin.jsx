import {useEffect} from "react";
import CookieAuthCheck from "./components/CookieAuthCheck";

export default function OAuthLogin() {
    const {isAuthenticated, authChecked} = CookieAuthCheck();

    useEffect(() => {
        if (authChecked && isAuthenticated) {
            window.location.href = "/";
        }
    }, [authChecked, isAuthenticated]);


    return <p>Logging you in...</p>;
}