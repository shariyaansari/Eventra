import axios from 'axios';
import {useEffect} from "react";

export default function Logout() {
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post("http://localhost:8080/logout", null, {
                    withCredentials: true,
                });
                window.location.href = "/login";
            } catch (error) {
                console.error("Logout error:", error);
            }
        };

        logout();
    }, []);

    return <p>Logging you out...</p>;
}