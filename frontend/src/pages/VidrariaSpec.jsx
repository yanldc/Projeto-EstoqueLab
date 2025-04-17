import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/Estoques.css'; 
import VidrariaSpecForm from '../components/vidrariaSpecForm';
import VidrariaSpecList from '../components/vidrariaSpecList';

function VidrariaSpec() {
  const location = useLocation();
  const { id, name } = location.state || {};

  return (
    <div>
      <NavBar/>
      <VidrariaSpecForm/>
      <br></br>
      <VidrariaSpecList id={id} />
    </div>
  );
}

export default VidrariaSpec;
