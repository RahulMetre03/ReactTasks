// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../api/api.js';
import { jwtDecode } from 'jwt-decode';
import { getProtectedData } from '../api/api.js';
import { useEffect } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    getProtectedData()
        .then(data => {
            console.log('Protected data:', data);
        })
        .catch(err => {
            console.error('Error fetching protected data:', err);
        });
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await checkLogin(username, password);
            if (response.success) {
                localStorage.setItem('token', response.token);
                const decoded = jwtDecode(response.token);

                if (decoded.role === 'principal') {
                    navigate('/principaldashboard');
                } 
                
                else if (decoded.role === 'teacher'){
                    navigate('/teacherdashboard')
                }

                 else if (decoded.role === 'student'){
                    navigate('/studentdashboard')
                }
                
                
                
                else {
                    setMessage(`Welcome, ${decoded.role}`);
                }
                // You can add: else if (decoded.role === 'teacher') navigate('/teacherdashboard');
                // else if (decoded.role === 'student') navigate('/studentpage');
            } else {
                setMessage('❌ Invalid credentials.');
            }
        } catch (err) {
            console.error(err);
            setMessage('⚠️ Login failed. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;