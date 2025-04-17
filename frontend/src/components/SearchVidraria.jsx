import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search'; 
import '../styles/List.css';

function VidrariasTable() {
  const [vidrariaName, setVidrariaName] = useState('');
  const [vidrarias, setVidrarias] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const navigate = useNavigate();

  //função de pesquisa
  const handleSearch = async (event) => {
  event.preventDefault();

  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3001/vidraria/${vidrariaName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setVidrarias(response.data); // Agora definimos a lista inteira de vidrarias
    setError(''); // Limpa qualquer erro anterior
  } catch (err) {
    setError('Vidraria não encontrada.');
    setVidrarias([]); // Limpa a lista de vidrarias
    console.error(err);
  }
};

//função de deletar
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
// Atualiza a lista após a exclusão
        setVidrarias(vidrarias.filter(vidraria => vidraria.id !== id));
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

//função de alteração
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
// Atualiza a lista após a edição
        setVidrarias(vidrarias.map(vidraria => 
          vidraria.id === id ? { ...vidraria, name: newName } : vidraria
        ));
        setEditingId(null); // Limpa o estado de edição
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
      <h2>Pesquisar Vidraria</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={vidrariaName}
          onChange={(e) => setVidrariaName(e.target.value)}
          placeholder="Digite o nome da vidraria"
          required
        />
        <Tooltip title="Buscar">
          <IconButton type="submit" color="primary">
            <SearchIcon /> 
          </IconButton>
        </Tooltip>
      </form>

      {error && <p className="error-message">{error}</p>}

      {vidrarias.length > 0 ? (
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
                    <Tooltip title="Confirmar Alteração">
                      <IconButton onClick={() => handleUpdate(vidraria.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip title="Alterar">
                        <IconButton onClick={() => handleEdit(vidraria.id, vidraria.name)} color="action">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(vidraria.id)} color="grey">
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
        <p>Nenhuma vidraria encontrada.</p>
      )}
    </div>
  );
}

export default VidrariasTable;
