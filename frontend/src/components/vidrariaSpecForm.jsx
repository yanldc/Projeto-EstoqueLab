import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/Form.css';

function VidrariaSpecForm() {
  const location = useLocation();
  const { id, name } = location.state || {};
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [dateBuy, setDateBuy] = useState('');
  const [nf, setNf] = useState('');
  const [supplier, setSupplier] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3001/vidrariaSpec/${id}`,
        { quantity, price, dateBuy, nf, supplier },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess('Estoque adicionado com sucesso!');
        setQuantity('');
        setPrice('');
        setDateBuy('');
        setNf('');
        setSupplier('');
        window.location.reload(); 
      }
    } catch (err) {
      setError('Erro ao criar estoque de vidraria. Verifique os dados e tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className='title'>
        <h2>Adicionar:  {name}</h2>
        <div className="form-container-spec">
      <form className='form-create' onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Nota Fiscal"
            value={nf}
            onChange={(e) => setNf(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Fornecedor"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>
                <div>
          <input
            type="date"
            placeholder="Data de Compra"
            value={dateBuy}
            onChange={(e) => setDateBuy(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button className='button-style' type="submit">Adicionar</button>
      </form>
      </div>
    </div>
  );
}

export default VidrariaSpecForm;
