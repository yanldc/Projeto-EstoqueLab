import React from 'react';
import NavBar from '../components/NavBar'; 

function HomePage() {
  return (
    <div className="home-container">
      <NavBar />
      <main>
        <h1>Bem-vindo à Home</h1>
        <p>Conteúdo exclusivo para usuários autenticados.</p>
      </main>
    </div>
  );
}

export default HomePage;
