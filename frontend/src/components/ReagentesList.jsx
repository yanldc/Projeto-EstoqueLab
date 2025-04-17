import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import '../styles/List.css';

function ReagentesList() {
  const [reagents, setReagents] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const itemsPerPage = 15;
  const navigate = useNavigate();

  const fetchReagents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/reagent?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { reagents: fetchedReagents, totalPages: fetchedTotalPages } = response.data;
      setReagents(fetchedReagents);
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      setError('Erro ao carregar reagentes.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReagents();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este reagente?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/reagent/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchReagents();
      } catch (err) {
        setError('Erro ao deletar reagente.');
        console.error(err);
      }
    }
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleUpdate = async (id) => {
    const confirmUpdate = window.confirm("Tem certeza que deseja alterar este reagente?");
    if (confirmUpdate) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:3001/reagent/${id}`,
          { name: newName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingId(null);
        fetchReagents();
      } catch (err) {
        setError('Erro ao atualizar reagente.');
        console.error(err);
      }
    }
  };

  const handleEstoque = (id, name) => {
    navigate(`/reagentSpec`, { state: { id, name } });
  };

  return (
    <div className="list-container">
      <h2>Reagentes Cadastrados</h2>
      {error && <p className="error-message">{error}</p>}
      {reagents.length > 0 ? (
        <>
          <table className="list-table">
            <thead>
              <tr>
                <th>Estoque</th>
                <th>Nome</th>
                <th>Responsável</th>
                <th>Data Criação</th>
                <th>Ultima Alteração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reagents.map((reagent) => (
                <tr key={reagent.id}>
                  <td>
                    <Tooltip title="Acessar Estoque">
                      <IconButton
                        onClick={() => handleEstoque(reagent.id, reagent.name)}
                        color="primary"
                      >
                        <InventoryIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td>
                    {editingId === reagent.id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="input-edit"
                      />
                    ) : (
                      reagent.name
                    )}
                  </td>
                  <td>{reagent.userName}</td>
                  <td>{reagent.created_at}</td>
                  <td>{reagent.updated_at}</td>
                  <td>
                    {editingId === reagent.id ? (
                      <Button onClick={() => handleUpdate(reagent.id)} size="small">
                        Confirmar
                      </Button>
                    ) : (
                      <>
                        <Tooltip title="Editar">
                        <IconButton onClick={() => handleEdit(reagent.id, reagent.name)} color="action">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton onClick={() => handleDelete(reagent.id)}>
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
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>Nenhum reagente cadastrado.</p>
      )}
    </div>
  );
}

export default ReagentesList;
