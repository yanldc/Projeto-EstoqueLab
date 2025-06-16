import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [cookieMessage, setCookieMessage] = useState('');
  const [showCookiePopup, setShowCookiePopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent === 'accepted') {
      setShowCookiePopup(false);
      
      const savedEmail = Cookies.get('userEmail');
      const savedPassword = Cookies.get('userPassword');
      
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
      
      if (savedPassword) {
        setPassword(savedPassword);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
     
      if (rememberMe && localStorage.getItem('cookieConsent') === 'accepted') {
        Cookies.set('userEmail', email, { expires: 7 });
        Cookies.set('userPassword', password, { expires: 7 });
        setCookieMessage('Suas credenciais foram salvas para facilitar futuros logins');
      } else if (!localStorage.getItem('cookieConsent') === 'accepted') {
        Cookies.remove('userEmail');
        Cookies.remove('userPassword');
      }

      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (err) {
      setError('Usuário ou senha incorretos');
    }
  };
  
  const handleCookieConsent = (accepted) => {
    if (accepted) {
      localStorage.setItem('cookieConsent', 'accepted');
    } else {
      localStorage.setItem('cookieConsent', 'rejected');
      
      Cookies.remove('userEmail');
      Cookies.remove('userPassword');
    }
    setShowCookiePopup(false);
  };

  return (
    <div id="container">
      {showCookiePopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ marginTop: 0 }}>Aviso de Cookies</h3>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), informamos que este site utiliza cookies para armazenar suas credenciais de login quando a opção "Lembrar minhas credenciais" estiver marcada.
            </p>
            <p>
              Ao aceitar, você concorda com o armazenamento de cookies em seu dispositivo para melhorar sua experiência de navegação.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button 
                onClick={() => handleCookieConsent(false)}
                style={{ padding: '8px 16px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px', cursor: 'pointer' }}
              >
                Recusar
              </button>
              <button 
                onClick={() => handleCookieConsent(true)}
                style={{ padding: '8px 16px', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
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
              <div style={{ display: 'flex', alignItems: 'center', width: '80%', margin: '10px 0' }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: '14px' }}>Lembrar minhas credenciais</label>
              </div>
              {cookieMessage && (
                <div style={{ 
                  backgroundColor: '#d4edda', 
                  color: '#155724', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  marginBottom: '10px',
                  width: '80%'
                }}>
                  {cookieMessage}
                </div>
              )}
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
