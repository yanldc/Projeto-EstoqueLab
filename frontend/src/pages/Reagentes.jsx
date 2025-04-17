import React from 'react';
import NavBar from '../components/NavBar'; 
import ReagenteForm from '../components/ReagenteForm';
import ReagentesList from '../components/ReagentesList';
import SearchReagente from '../components/SearchReagente';

function Reagente() {
  return (
    <div>
      <NavBar />
      <main >
        <ReagenteForm/>
        <br></br>
        <SearchReagente/>
        <br></br>
        <ReagentesList />
      </main>
    </div>
  );
}

export default Reagente;
