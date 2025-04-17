import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

function ReagenteForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(''); 

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3001/reagent',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) { 
        window.location.reload(); 
      }
    } catch (err) {
      setError('Erro ao cadastrar reagente. Verifique os dados e tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastrar Reagente</h2>
      <form className='form-create' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do reagente"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className='button-style' type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ReagenteForm;
