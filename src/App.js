import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import AgregarPlanta from './components/AgregarPlanta';
import MiPerfil from './components/MiPerfil';
import Enciclopedia from './components/Enciclopedia';
import TablaPlantas from './components/TablaPlantas';
import ModifyProfile from './components/ModifyProfile';
import Recomendaciones from './components/Recomendaciones';
import Tareas from './components/Tareas';
import DeleteProfile from './components/DeleteProfile';
import Notificaciones from './components/Notificaciones';
import ImageAnalyzer from './components/ImageAnalyzer';
import Footer from './components/Footer';
import Administracion from './components/Administracion';
import AgregarPlantaAdmin from './components/AgregarPlantaAdmin';
import TablaPlantasAdmin from './components/TablaPlantasAdmin';
import AgregarTipoPlanta from './components/AgregarTipoPlanta';
import TablaTipoPlantas from './components/TablaTipoPlantas';

const queryClient = new QueryClient();

const App = () => {
  return (
      <QueryClientProvider client={queryClient}>
          <Router>
              <Routes>
                  {/* Rutas para LoginForm y SignupForm, sin Navbar */}
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/signup" element={<SignupForm />} />

                  {/* Rutas protegidas con Navbar */}
                  <Route
                      path="/*"
                      element={
                          <>
                              <Navbar />
                              <div className='myContent'>
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="administracion" element={<Administracion />} />
                                    <Route path="agregar" element={<AgregarPlanta />} />
                                    <Route path="agregarAdmin" element={<AgregarPlantaAdmin />} />
                                    <Route path="enciclopedia" element={<Enciclopedia />} />
                                    <Route path="mis-tareas" element ={<Tareas />} />
                                    <Route path="perfil" element ={<MiPerfil />} />
                                    <Route path="delete-my-profile" element ={<DeleteProfile />} />
                                    <Route path="modificar" element={<TablaPlantas />} />
                                    <Route path="modify" element={<ModifyProfile />} />
                                    <Route path="recomendaciones" element={<Recomendaciones />} />
                                    <Route path="mis-notificaciones" element={<Notificaciones />} />
                                    <Route path="detectar-planta" element={<ImageAnalyzer />} />
                                    <Route path="modificarAdmin" element={<TablaPlantasAdmin />} />
                                    <Route path="agregar-tipo-planta" element={<AgregarTipoPlanta />} />
                                    <Route path="tipos-de-planta" element={<TablaTipoPlantas />} />
                                </Routes>
                               
                              </div>
                              <Footer />
                              
                              
                          </>
                      }
                  />
              </Routes>
          </Router>
      </QueryClientProvider>
  );
};

export default App;
