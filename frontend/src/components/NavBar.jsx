import React from 'react';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navigateToPage = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#006400' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Estoque
        </Typography>
        <Tabs value={false} textColor="inherit" indicatorColor="secondary">
          <Tab label="Vidrarias" onClick={() => navigateToPage('Vidrarias')} />
          <Tab label="Reagentes" onClick={() => navigateToPage('Reagentes')} />
        </Tabs>
        <Button color="inherit" onClick={handleLogout}>Sair</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
