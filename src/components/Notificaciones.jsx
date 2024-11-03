import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Notificaciones.css';


const Notificaciones = () => {

    const navigate = useNavigate('');
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [navigate]);



    const getNotificaciones = async () => {
        try {
            const response = await axios.get("http://localhost/API/getNotifications.php", { withCredentials: true })
            if (response.data && response.data.data) {
                setNotificaciones(response.data.data);
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


    const handleEliminarNotificacion = async (id_n) => {
        console.log(id_n)
        try{
            const response = await axios.delete(`http://localhost/API/deleteNotificacion.php?id_r=${id_n}`, { withCredentials: true });
            if (response.data.success) {
                //alert('Se borro la notificacion');
                getNotificaciones();
            } else {
                alert("Hubo un error inesperado");
            }
            
        } catch (err) {
            console.error('Error al borrar la tarea:', err);
            setError('Error al cargar las tareas');
        }
    };


    useEffect(() => {
        getNotificaciones();
    }, []);

    if (loading) return <img src = "planta8.gif" alt="CargandoGif" className='Cargando'></img>

    return(
        <div className="notificaciones-container">
            <h2 className="tareas-title">Notificaciones</h2>
            
            {/*<div>
                <label htmlFor="filter">Filtrar por tipo de tarea: </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="">Todas</option>
                    <option value="Riego">Riego</option>
                    <option value="Fertilización">Fertilización</option>
                </select>
            </div>*/}

            <br />
            <br />

            <div className="notificaciones-grid">
                {notificaciones.map((notificacion, index) => (
                    <div key={index} className="notificacion-card">
                        <div className="tarea-info">
                            <h3 className="notificacion-desc">
                                {notificacion.descripcion} - {notificacion.tarea}
                            </h3>
                            <p className="notificacion-planta">
                                <strong></strong> Planta: {notificacion.nombre_comun}
                            </p>
                            <p className="notificacion-date">
                                <strong></strong>{notificacion.fecha_recordatorio}
                            </p>
                        </div>
                        {/* Botón de eliminación */}
                        <button 
                            className="eliminar-btn" 
                            onClick={() => handleEliminarNotificacion(notificacion.id_r)} 
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>


            {error && <p className="error">{error}</p>}
        </div>
    )

};

export default Notificaciones
