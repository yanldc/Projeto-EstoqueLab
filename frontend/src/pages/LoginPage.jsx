import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div id="container">
      <div className="form">
        <div className="box-form">
          <div className="container-form">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '80%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '80%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
              />
              <div className="box-button">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
          <div className="container-img">
            {/* Colocar aqui o logo*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
