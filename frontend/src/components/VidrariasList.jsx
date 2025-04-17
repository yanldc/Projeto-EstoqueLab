import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import '../styles/List.css';

function VidrariasList() {
  const [vidrarias, setVidrarias] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const itemsPerPage = 15;
  const navigate = useNavigate();

  const fetchVidrarias = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/vidraria?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { vidrarias: fetchedVidrarias, totalPages: fetchedTotalPages } = response.data;
      setVidrarias(fetchedVidrarias);
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      setError('Erro ao carregar vidrarias.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVidrarias();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta vidraria?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3001/vidraria/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchVidrarias();
      } catch (err) {
        setError('Erro ao deletar vidraria.');
        console.error(err);
      }
    }
  };

  const handleEdit = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleUpdate = async (id) => {
    const confirmUpdate = window.confirm("Tem certeza que deseja alterar esta vidraria?");
    if (confirmUpdate) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:3001/vidraria/${id}`,
          { name: newName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingId(null);
        fetchVidrarias();
      } catch (err) {
        setError('Erro ao atualizar vidraria.');
        console.error(err);
      }
    }
  };

  const handleEstoque = (id, name) => {
    navigate(`/vidrariaSpec`, { state: { id, name } });
  };

  return (
    <div className="list-container">
      <h2>Vidrarias Cadastradas</h2>
      {error && <p className="error-message">{error}</p>}
      {vidrarias.length > 0 ? (
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
              {vidrarias.map((vidraria) => (
                <tr key={vidraria.id}>
                  <td>
                    <Tooltip title="Acessar Estoque">
                      <IconButton
                        onClick={() => handleEstoque(vidraria.id, vidraria.name)}
                        color="primary"
                      >
                        <InventoryIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td>
                    {editingId === vidraria.id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="input-edit"
                      />
                    ) : (
                      vidraria.name
                    )}
                  </td>
                  <td>{vidraria.userName}</td>
                  <td>{vidraria.created_at}</td>
                  <td>{vidraria.updated_at}</td>
                  <td>
                    {editingId === vidraria.id ? (
                      <Button onClick={() => handleUpdate(vidraria.id)} size="small">
                        Confirmar
                      </Button>
                    ) : (
                      <>
                        <Tooltip title="Editar">
                          <IconButton onClick={() => handleEdit(vidraria.id, vidraria.name)}>
                            <EditIcon color="action" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton onClick={() => handleDelete(vidraria.id)}>
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
        <p>Nenhuma vidraria cadastrada.</p>
      )}
    </div>
  );
}

export default VidrariasList;
