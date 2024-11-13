import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const TablaTipoPlantas = () => {
    const [tipoPlantas, setTipoPlantas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTipoPlanta, setSelectedTipoPlanta] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [noAdmin, setNoAdmin] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const role = localStorage.getItem('rol');
        console.log(role);

        if(role !== "administrador"){
            setNoAdmin(true);
        } else {
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
        }

        
    }, [navigate]);

    const handleReturn = () => { 
        navigate('/administracion'); 
    };

    const fetchTipoPlantas = async () => {
        try {
            const response = await axios.get('http://localhost/API/getTypePlants.php', { withCredentials: true });
            if (response.data && response.data.success && response.data.data) {
                setTipoPlantas(response.data.data);
            } else {
                setError('No se encontraron tipos de plantas');
            }
        } catch (err) {
            console.error('Error al cargar los tipos de plantas:', err);
            setError('Error al cargar los tipos de plantas');
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = async (id) => {
        console.log(id);
        if (window.confirm('¿Estás seguro de que deseas eliminar este tipo de planta?')) {
            try {
                const response = await axios.delete(`http://localhost/API/eliminarTipoPlanta.php?id_Tipo=${id}}`, { withCredentials: true });
                if (response.data.success) {
                    alert('Tipo de planta eliminado con éxito');
                    fetchTipoPlantas();
                } else {
                    alert('Error al eliminar el tipo de planta');
                }
            } catch (err) {
                console.error('Error al eliminar el tipo de planta:', err);
                alert('Error al eliminar el tipo de planta');
            }
        }
    };

    const handleModificar = async (id) => {
        if (!nombre.trim() || !descripcion.trim()) {
            alert('Nombre y Descripción son obligatorios');
            return;
        }

        const updatedTipoPlanta = {
            id: id,
            nombre: nombre.trim(),
            descripcion: descripcion.trim()
        };
        try {
            const response = await axios.put(
                'http://localhost/API/modificarTipoPlanta.php',
                updatedTipoPlanta, 
                { withCredentials: true }
            );
            if (response.data.success) {
                alert('Tipo de planta modificado con éxito');
                setSelectedTipoPlanta(null);
                fetchTipoPlantas();
            } else {
                alert('Error al modificar el tipo de planta');
            }
        } catch (err) {
            console.error('Error al modificar el tipo de planta:', err);
            alert('Error al modificar el tipo de planta');
        }
    };

    const handleAgregar = async () => {
        if (!nombre.trim() || !descripcion.trim()) {
            alert('Nombre y Descripción son obligatorios');
            return;
        }

        const newTipoPlanta = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim()
        };

        try {
            const response = await axios.post(
                'http://localhost/API/agregarTipoPlanta.php',
                newTipoPlanta, 
                { withCredentials: true }
            );
            if (response.data.success) {
                alert('Tipo de planta agregado con éxito');
                setNombre('');
                setDescripcion('');
                fetchTipoPlantas();
            } else {
                alert('Error al agregar el tipo de planta');
            }
        } catch (err) {
            console.error('Error al agregar el tipo de planta:', err);
            alert('Error al agregar el tipo de planta');
        }
    };

    useEffect(() => {
        fetchTipoPlantas();
    }, []);


    if(noAdmin) return <h1>No tienes permisos para ver este panel</h1>
    if (loading) return <div className="text-center my-5"><img src="planta8.gif" alt="Cargando" className='Cargando' /></div>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    const filteredTipoPlantas = tipoPlantas.filter(tp =>
        tp.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Tipos de Plantas</h1>
            
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="form-control me-2"
                    style={{ maxWidth: '300px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-success" onClick={() => setSelectedTipoPlanta({ Nombre: '', Descripcion: '' })}>
                    Agregar Tipo de Planta
                </button>
            </div>

            <div className="row">
                {filteredTipoPlantas.length > 0 ? (
                    filteredTipoPlantas.map((tipo) => (
                        <div className="col-md-6 mb-4" key={tipo.Nombre}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{tipo.Nombre}</h5>
                                    <p className="card-text">{tipo.Descripcion}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => {
                                            setSelectedTipoPlanta(tipo);
                                            setNombre(tipo.Nombre);
                                            setDescripcion(tipo.Descripcion);
                                        }}>
                                        Modificar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminar(tipo.id_Tipo)}>
                                        <img src="trashIcon.png" alt="Eliminar" style={{ width: '1.5em', height: '1.5em' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">No hay tipos de plantas disponibles</p>
                    </div>
                )}
            </div>

            {selectedTipoPlanta && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedTipoPlanta.Nombre ? 'Modificar Tipo de Planta' : 'Agregar Tipo de Planta'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedTipoPlanta(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedTipoPlanta(null)}>
                                    Cerrar
                                </button>
                                {selectedTipoPlanta.Nombre ? (
                                    <button type="button" className="btn btn-primary" onClick={() => handleModificar(selectedTipoPlanta.id_Tipo)}>
                                        Guardar Cambios
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-success" onClick={handleAgregar}>
                                        Agregar
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center mt-4">
                <button onClick={handleReturn} className='btn btn-secondary'>Regresar</button>
            </div>
        </div>
    );
};

export default TablaTipoPlantas;
