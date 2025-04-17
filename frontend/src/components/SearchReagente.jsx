import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search'; 
import '../styles/List.css';

function ReagentesTable() {
  const [reagentName, setReagentName] = useState('');
  const [reagents, setReagents] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  //função de pesquisa
  const handleSearch = async (event) => {
  event.preventDefault();

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3001/reagent/${reagentName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReagents(response.data); 
    setError(''); 
  } catch (err) {
    setError('Vidraria não encontrada.');
    setReagents([]); 
    console.error(err);
  }
};

//função de deletar
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
// Atualiza a lista após a exclusão
        setReagents(reagents.filter(reagent => reagent.id !== id));
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

//função de alteração
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
// Atualiza a lista após a edição
        setReagents(reagents.map(reagent => 
          reagent.id === id ? { ...reagent, name: newName } : reagent
        ));
        setEditingId(null);
      } catch (err) {
        setError('Erro ao atualizar reagente.');
        console.error(err);
      }
    }
  };

  const handleEstoque = (id, name) => {
    navigate(`/ReagentSpec`, { state: { id, name } });
  };

  return (
    <div className="list-container">
      <h2>Pesquisar Reagente</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={reagentName}
          onChange={(e) => setReagentName(e.target.value)}
          placeholder="Digite o nome do reagente"
          required
        />
        <Tooltip title="Buscar">
          <IconButton type="submit" color="primary">
            <SearchIcon /> 
          </IconButton>
        </Tooltip>
      </form>

      {error && <p className="error-message">{error}</p>}

      {reagents.length > 0 ? (
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
                    <Tooltip title="Confirmar Alteração">
                      <IconButton onClick={() => handleUpdate(reagent.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip title="Alterar">
                        <IconButton onClick={() => handleEdit(reagent.id, reagent.name)} color="action">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(reagent.id)} color="grey">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum reagente encontrada.</p>
      )}
    </div>
  );
}

export default ReagentesTable;
