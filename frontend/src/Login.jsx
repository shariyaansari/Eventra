import {useState} from 'react'
import axios from 'axios';

function LoginPage() {

    // this just test page, implement the logic in this page to original page and also change routes to the main page



    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/login',
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
            );
        window.location.href = '/';
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <a>reset Password</a>
            <button type="submit">Login</button>
            <a href="http://localhost:8080/oauth2/authorization/google">google</a>
            <a href="http://localhost:8080/oauth2/authorization/facebook">facebook</a>
        </form>
    );


}

export default LoginPage;