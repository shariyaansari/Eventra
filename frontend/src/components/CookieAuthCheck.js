import {useEffect, useState} from "react";
import axios from "axios";


export default function CookieAuthCheck() {
       const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [authChecked, setAuthChecked] = useState(false);

        useEffect(() => {
            axios
                .get("http://localhost:8080/check-cookie-authentication", {
                    withCredentials: true,
                })
                .then((res) => setIsAuthenticated(res.data === true))
                .catch((err) => console.error(err))
                .finally(() => setAuthChecked(true));
        }, []);

        return {isAuthenticated, authChecked};
    }