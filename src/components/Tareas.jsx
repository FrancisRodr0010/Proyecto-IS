import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Tareas.css';

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [filteredTareas, setFilteredTareas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const navigate = useNavigate();

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

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost/API/getTasks.php", { withCredentials: true });
            if (response.data && response.data.data) {
                setTareas(response.data.data);
                setFilteredTareas(response.data.data);
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


    const handleDeleteTask = async (id_t) => {
        console.log(id_t)
        try{
            const response = await axios.delete(`http://localhost/API/deleteTask.php?id_t=${id_t}`, { withCredentials: true });
            if (response.data.success) {
                alert('Tarea borrada');
                fetchTasks();
            } else {
                alert("Hubo un error inesperado");
            }
            
        } catch (err) {
            console.error('Error al borrar la tarea:', err);
            setError('Error al cargar las tareas');
        }
    };


    useEffect(() => {
        fetchTasks();
    }, []);

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilter(value);
        setFilteredTareas(
            value ? tareas.filter((tarea) => tarea.tarea === value) : tareas
        );
    };

    const getImageForTask = (tarea) => {
        return tarea === 'Riego' ? 'regar3.gif' : tarea === 'Fertilización' ? 'fertilizar2.gif' : 'planta5.png';
    };

    if (loading) return <img src = "planta8.gif" alt="CargandoGif" className='Cargando'></img>

    return (
        <div className="tareas-container">
            <h2 className="tareas-title">Registro de tareas</h2>
            
            <div>
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
            </div>

            <br />
            <br />

            <div className="tareas-grid">
                {filteredTareas.map((tarea, index) => (
                    <div key={index} className="tarea-card">
                        <img
                            src={getImageForTask(tarea.tarea)}
                            alt={tarea.tarea}
                            className="tarea-image"
                        />
                        <div className="tarea-info">
                            <h3 className="tarea-name">Registro sobre la planta: {tarea.nombre_comun}</h3>
                            <p className="tarea-type"><strong>Tarea:</strong> {tarea.tarea}</p>
                            <p className="tarea-date"><strong>Fecha de Registro:</strong> {tarea.fecha_registro}</p>
                        </div>

                        <div className = "buttonContainer">
                            <button className= "deleteTaskButton" onClick={() => handleDeleteTask(tarea.id_t)}>Borrar tarea</button>
                        </div>
                    </div>
                ))}
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Tareas;
