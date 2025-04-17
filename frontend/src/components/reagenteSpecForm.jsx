import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../styles/Form.css';

function ReagentSpecForm() {
  const location = useLocation();
  const { id, name } = location.state || {};
  const [quantity, setQuantity] = useState('');
  const [lote, setLote] = useState('');
  const [price, setPrice] = useState('');
  const [validity, setValidity] = useState('');
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
        `http://localhost:3001/reagentSpec/${id}`,
        { quantity, lote, price, validity, dateBuy, nf, supplier },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess('Estoque adicionado com sucesso!');
        setQuantity('');
        setLote('');
        setPrice('');
        setValidity('');
        setDateBuy('');
        setNf('');
        setSupplier('');
        window.location.reload(); 
      }
    } catch (err) {
      setError('Erro ao criar estoque de reagente. Verifique os dados e tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className='title'>
        <h2>Adicionar:  {name}</h2>
        <div className="form-container-spec2">
      <form className='form-create' onSubmit={handleSubmit}>
        <div>
          <label>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lote</label>
          <input
            type="text"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nota Fiscal</label>
          <input
            type="text"
            value={nf}
            onChange={(e) => setNf(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fornecedor</label>
          <input
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Validade</label>
          <input
            type="date"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Compra</label>
          <input
            type="date"
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

export default ReagentSpecForm;
