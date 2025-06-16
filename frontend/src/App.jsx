import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Home from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Vidrarias from './pages/Vidrarias';
import Reagentes from './pages/Reagentes';
import VidrariaSpec from './pages/VidrariaSpec'; 
import ReagentSpec from './pages/ReagentSpec';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/vidrarias" element={
        <ProtectedRoute>
          <Vidrarias />
        </ProtectedRoute>
      } />
      <Route path="/reagentes" element={
        <ProtectedRoute>
          <Reagentes />
        </ProtectedRoute>
      } />
      <Route path="/vidrariaSpec" element={
        <ProtectedRoute>
          <VidrariaSpec />
        </ProtectedRoute>
      } />
      <Route path="/reagentSpec" element={
        <ProtectedRoute>
          <ReagentSpec />
        </ProtectedRoute>
      } />

    </Routes>
  );
}

export default App;
