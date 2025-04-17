import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../styles/List.css';

function VidrariaSpecList({ id }) {
  const [vidrariaSpecs, setVidrariaSpecs] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [newData, setNewData] = useState({ quantity: '', price: '', dateBuy: '', nf: '', supplier: '' });
  const itemsPerPage = 15;
  const [quantityCondition, setQuantityCondition] = useState('greaterThanZero'); 

  const fetchVidrariaSpecs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/vidrariaSpec/${id}?page=${currentPage}&limit=${itemsPerPage}&quantityCondition=${quantityCondition}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { vidrariaSpecs: fetchedVidrariaSpecs, totalPages: fetchedTotalPages } = response.data;
      setVidrariaSpecs(fetchedVidrariaSpecs);
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      setError('Erro ao carregar estoque.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVidrariaSpecs();
  }, [currentPage, quantityCondition]); 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (specId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta vidraria?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/vidrariaSpec/${id}/${specId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchVidrariaSpecs();
      } catch (err) {
        setError('Erro ao deletar.');
        console.error(err);
      }
    }
  };

  const handleEdit = (specId, currentData) => {
    setEditingId(specId);
    setNewData(currentData);
  };

  const handleUpdate = async (specId) => {
    const confirmUpdate = window.confirm("Tem certeza que deseja realizar uma alteração?");
    if (confirmUpdate) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:3001/vidrariaSpec/${id}/${specId}`,
          {
            quantity: newData.quantity,
            price: newData.price,
            dateBuy: newData.dateBuy,
            nf: newData.nf,
            supplier: newData.supplier,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingId(null);
        setNewData({ quantity: '', price: '', dateBuy: '', nf: '', supplier: '' });
        fetchVidrariaSpecs();
      } catch (err) {
        setError('Erro ao atualizar estoque.');
        console.error(err);
      }
    }
  };

  return (
    <div className="list-container">
      {error && <p className="error-message">{error}</p>} 
      <div className='menu-list'>
        <button className='button-style' onClick={() => setQuantityCondition('all')}>Todos</button>
        <button className='button-style' onClick={() => setQuantityCondition('greaterThanZero')}>Em Estoque</button>
        <button className='button-style' onClick={() => setQuantityCondition('equalToZero')}>Esgotados</button>
      </div>

      {vidrariaSpecs.length > 0 ? (
        <>
          <table className="list-table">
            <thead>
              <tr>
                <th>Quantidade em Estoque</th>
                <th>Quantidade Comprada</th>
                <th>Preço Unitário</th>
                <th>Data de Compra</th>
                <th>Nota Fiscal</th>
                <th>Fornecedor</th>
                <th>Data criação</th>
                <th>Ultima Alteração</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vidrariaSpecs.map((spec) => (
                <tr key={spec.id}>
                  <td>
                    {editingId === spec.id ? (
                      <input
                        type="number"
                        value={newData.quantity}
                        onChange={(e) => setNewData({ ...newData, quantity: e.target.value })}
                      />
                    ) : (
                      spec.quantity
                    )}
                  </td>
                  <td>
                    {editingId === spec.id ? (
                      <input
                        type="number"
                        value={newData.quantityBuy}
                        onChange={(e) => setNewData({ ...newData, quantityBuy: e.target.value })}
                      />
                    ) : (
                      spec.quantityBuy
                    )}
                  </td>
                  <td>
                    {editingId === spec.id ? (
                      <input
                        type="number"
                        value={newData.price}
                        onChange={(e) => setNewData({ ...newData, price: e.target.value })}
                      />
                    ) : (
                      spec.price
                    )}
                  </td>
                  <td>
                    {editingId === spec.id ? (
                      <input
                        type="date"
                        value={newData.dateBuy}
                        onChange={(e) => setNewData({ ...newData, dateBuy: e.target.value })}
                      />
                    ) : (
                      spec.dateBuy
                    )}
                  </td>
                  <td>
                    {editingId === spec.id ? (
                      <input
                        type="text"
                        value={newData.nf}
                        onChange={(e) => setNewData({ ...newData, nf: e.target.value })}
                      />
                    ) : (
                      spec.nf
                    )}
                  </td>
                  <td>
                    {editingId === spec.id ? (
                      <input
                        type="text"
                        value={newData.supplier}
                        onChange={(e) => setNewData({ ...newData, supplier: e.target.value })}
                      />
                    ) : (
                      spec.supplier
                    )}
                  </td>
                  <td>{spec.created_at}</td>
                  <td>{spec.updated_at}</td>
                  <td>{spec.userName}</td>
                  <td>
                    {editingId === spec.id ? (
                      <button onClick={() => handleUpdate(spec.id)}>Confirmar</button>
                    ) : (
                      <>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => handleEdit(spec.id, spec)}>
                            <EditIcon color="action" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton onClick={() => handleDelete(spec.id)}>
                            <DeleteIcon/>
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>Estoque vazio.</p>
      )}
    </div>
  );
}

export default VidrariaSpecList;
