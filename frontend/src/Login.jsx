import {useState} from 'react'
import axios from 'axios';

function LoginPage() {

    // this just test page, implement the logic in this page to original page and also change routes to the main page



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/login',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
                .then(res => {alert(res.data)});
        window.location.href = '/';
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            <label>Enter your Email</label>
            <input
                name="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br/>
            <label>Enter Password</label>
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br/>
            <a href="#reset-password">reset Password</a><br/>
            <button type="submit" className="btn-secondary">Login</button><br/>
            <a href="http://localhost:8080/oauth2/authorization/google" className="btn-secondary">google</a><br/>
            <a href="http://localhost:8080/oauth2/authorization/facebook" className="btn-secondary">facebook</a><br/>


            <a href="/register" className="btn-secondary">not a registered user,Click here</a>
        </form>
    );


}

export default LoginPage;