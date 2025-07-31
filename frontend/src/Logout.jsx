import axios from 'axios';
import {useEffect} from "react";


function Logout() {
    useEffect(async () => {

        await axios.post("http://localhost:8080/logout", null, {
            withCredentials: true
        })
            .catch(error => console.error(error));

        window.location.href = "/login";


    }, []);
}

export default Logout;