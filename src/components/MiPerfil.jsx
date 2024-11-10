import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'; // Importa los estilos de react-clock
import './miPerfil.css';

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
    const [time, setTime] = useState(new Date());

    // Actualizar la hora cada segundo
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        const verificarSesion = async () => {
            try {
                const response = await axios.get('http://localhost/API/verificar_sesion.php', { withCredentials: true });
                if (!response.data.sesion_activa) {
                    navigate('/');
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
                setTareas(response.data.data.slice(0, 2));
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
                setProxTareas(response.data.data.slice(0, 3));
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

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/API/logout.php', { withCredentials: true });
            localStorage.removeItem('username');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

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

                <div className="follow-info">
                    <button className="delete-button" onClick={handleLogout}>Cerrar sesión</button>
                </div>
            </div>
            
            {/* Sección de Actividades Recientes */}
            <div className="calendar-section">
                <h5 className="card2-text">Actividad reciente</h5>
                {loading ? (
                    <img src="planta8.gif" alt="CargandoGif" className='Cargando' /> 
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
            <div className="fill-Container">
                <div className="clock-widget">
                    <Clock value={time} className="analog-clock" />
                    <p className="digital-time">{time.toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="proxActivitiesSection">
                <h5 className="card3-text">Pendiente por realizar</h5>
                {loading ? (
                    <img src="planta8.gif" alt="CargandoGif" className='Cargando' />
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
