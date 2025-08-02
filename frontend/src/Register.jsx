import {useState} from 'react'
import axios from 'axios';

function RegisterPage() {

    // this just test page, implement the logic in this page to original page and also change routes to the main page


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
           await axios.post('http://localhost:8080/register',
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            window.location.href = "/login";

        } catch (err) {
            console.error(err);
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
            <label>Enter your password</label>
            <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br/>
            <button type="submit" className="btn-secondary">Register</button>
        </form>
    );


}

export default RegisterPage;