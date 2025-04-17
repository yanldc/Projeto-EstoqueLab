import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../styles/Estoques.css'; 
import ReagentSpecForm from '../components/reagenteSpecForm';
import ReagentSpecList from '../components/reagentSpecList';

function ReagentSpec() {
  const location = useLocation();
  const { id, name } = location.state || {};

  return (
    <div>
      <NavBar/>
      <ReagentSpecForm/>
      <br></br>
      <ReagentSpecList id={id}/>
    </div>
  );
}

export default ReagentSpec;
