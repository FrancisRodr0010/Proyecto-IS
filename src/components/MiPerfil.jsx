import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './miPerfil.css'; // External CSS for styling

const MiPerfil = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: localStorage.getItem('username') || '',
        email: localStorage.getItem('email') || ''
    });
    const [tareas, setTareas] = useState([]);
    const [proxTareas, setProxTareas] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const verificarSesion = async () => {
            try {
            const response = await axios.get('http://localhost/API/verificar_sesion.php', { withCredentials: true });
            if (!response.data.sesion_activa) {
                navigate('/'); // Redirige a la raíz si no hay sesión activa
            }
            } catch (error) {
            console.error('Error al verificar la sesión:', error);
            navigate('/');
            }
        };
        verificarSesion();

        const userIdFromSession = localStorage.getItem('user_id');
        if (!userIdFromSession) {
            navigate('/');
        }

        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost/API/getTasks.php", { withCredentials: true });
                if (response.data && response.data.data) {
                    setTareas(response.data.data.slice(0, 2)); // Obtiene solo las primeras dos tareas
                } else {
                    setError('No se encontraron tareas');
                }
            } catch (err) {
                console.error('Error al cargar las tareas:', err);
                setError('Error al cargar las tareas');
            } finally {
                setLoading(false);
            }
        };


        const fetchProxTasks = async () => {
            try {
                const response = await axios.get("http://localhost/API/getProxTasks.php", { withCredentials: true });
                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    setProxTareas(response.data.data.slice(0, 2)); // Obtiene solo las primeras dos tareas
                } else {
                    setError('No se encontraron tareas');
                }
            } catch (err) {
                console.error('Error al cargar las tareas:', err);
                setError('Error al cargar las tareas');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
        fetchProxTasks();
    }, [navigate]);

    return (
        <> 
        <div className="perfil-container">
            <div className="profile-section">
                <div className="profile-info">
                    <img src="perfil2.png" alt="Profile" className="profile-image" />
                    <h2 className="username">{user.username}</h2>
                    <p className="email">Correo: {user.email}</p>
                </div>
                <div className="follow-info">
                    <button className="modify-button" onClick={() => navigate('/modify')}>Editar cuenta</button>
                </div>
                <div className="follow-info">
                    <button className="delete-button" onClick={() => navigate('/delete-my-profile')}>Eliminar cuenta</button>
                </div>
            </div>
            
            {/* Sección de Actividades Recientes */}
            <div className="calendar-section">
                <h5 className="card2-text">Actividad reciente</h5>
                {loading ? (
                    <img src = "planta8.gif" alt="CargandoGif" className='Cargando'></img> 
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="recent-activities">
                        {tareas.map((tarea, index) => (
                            <div key={index} className="activity-card">
                                <p><strong>Tarea:</strong> {tarea.tarea}</p>
                                <p><strong>Fecha realizada:</strong> {tarea.fecha_registro}</p>
                                <p><strong>Planta:</strong> {tarea.nombre_comun}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        

        <div className="comingActivitiesContainer">
            <div className = "fill-Container">

            </div>

            <div className = "proxActivitiesSection">
                <h5 className="card3-text">Pendiente a realizar</h5>
                {loading ? (
                    <img src = "planta8.gif" alt="CargandoGif" className='Cargando'></img> 
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="recent-activities">
                        {proxTareas.map((tarea, index) => (
                            <div key={index} className="proxactivity-card">
                                <p><strong>Tarea:</strong> {tarea.tarea}</p>
                                <p><strong>Dia a realizar:</strong> {tarea.fecha_programada}</p>
                                <p><strong>Hacia la planta:</strong> {tarea.nombre_comun}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
        
        </>
    );
};

export default MiPerfil;
