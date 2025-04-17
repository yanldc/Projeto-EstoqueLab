import React from 'react';
import NavBar from '../components/NavBar'; 
import VidrariaForm from '../components/VidrariaForm';
import VidrariasList from '../components/VidrariasList';
import SearchVidraria from '../components/SearchVidraria';


function Vidraria() {
  return (
    <div>
      <NavBar />
      <main >
        <VidrariaForm />
        <br></br>
        <SearchVidraria/>
        <br></br>
        <VidrariasList />
      </main>
    </div>
  );
}

export default Vidraria;
