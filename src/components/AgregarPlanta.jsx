import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchPlantas = async () => {
    const response = await axios.get('http://localhost:5000/api/plants');
    console.log(response.data.data);
    return response.data.data;
};

const AgregarPlanta = () => {
    const [plantaSeleccionada, setPlantaSeleccionada] = useState('');
    const [plantaInfo, setPlantaInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mostrarFormularioManual, setMostrarFormularioManual] = useState(false);
    const [plantaManual, setPlantaManual] = useState({
        nombre_comun: '',
        nombre_cientifico: '',
        descripcion: '',
        frecuencia_riego: '',
        frecuencia_fertilizacion: ''
    });

    const { data: plantas = [], error, isLoading } = useQuery({
        queryKey: ['plantas'],
        queryFn: fetchPlantas,
    });

    const navigate = useNavigate();
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
    }, [navigate]);

    const handlereturn = () => navigate('/Dashboard');

    const manejarCambio = (event) => {
        const idPlanta = event.target.value;
        setPlantaSeleccionada(idPlanta);
        const plantaSeleccionada = plantas.find(planta => planta.id === parseInt(idPlanta));
        setPlantaInfo(plantaSeleccionada);
    };

    const manejarCambioRiegoAPI = (event) => {
        setPlantaInfo({ ...plantaInfo, frecuencia_riego: event.target.value });
    };

    const manejarCambioFertilizacionAPI = (event) => {
        setPlantaInfo({ ...plantaInfo, frecuencia_fertilizacion: event.target.value });
    };

    const manejarEnvio = async (event) => {
        event.preventDefault();

        const plantaData = mostrarFormularioManual ? plantaManual : {
            nombre_comun: plantaInfo.common_name,
            nombre_cientifico: plantaInfo.scientific_name,
            descripcion: plantaInfo.description,
            frecuencia_riego: plantaInfo.frecuencia_riego,
            frecuencia_fertilizacion: plantaInfo.frecuencia_fertilizacion
        };

        if (!plantaData.nombre_comun || !plantaData.nombre_cientifico || isSubmitting) return;

        setIsSubmitting(true);

        try {
            await axios.post('http://localhost/API/agregarPlanta.php', plantaData, { withCredentials: true });
            alert('Planta agregada correctamente');
            //setShowModal(true);
            setPlantaSeleccionada('');
            setPlantaInfo(null);
            setMostrarFormularioManual(false);
            setPlantaManual({ nombre_comun: '', nombre_cientifico: '', descripcion: '', frecuencia_riego: '', frecuencia_fertilizacion: '' });

            navigate('/modificar');
            
        } catch (error) {
            console.error('Error al guardar la planta:', error);
            alert('Error al agregar la planta');
        } finally {
            setIsSubmitting(false);
        }
    };

    const manejarCambioFormularioManual = (event) => {
        const { name, value } = event.target;
        setPlantaManual({ ...plantaManual, [name]: value });
    };

    if (isLoading) return <p style={styles.loadingText}>Cargando plantas...</p>;
    if (error) return <p style={styles.errorText}>Error al buscar las plantas: {error.message}</p>;

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <img src="planta7.gif" alt="Gestión de Plantas" style={styles.image} />
            </div>

            <div style={styles.formContainer}>
                <h2 style={styles.title}>Agregar Planta</h2>
                <button onClick={() => setMostrarFormularioManual(!mostrarFormularioManual)} style={styles.toggleButton}>
                    {mostrarFormularioManual ? 'Agregar por medio de API' : 'Agregar Planta Manualmente'}
                </button>

                {mostrarFormularioManual ? (
                    <form onSubmit={manejarEnvio} style={styles.form}>
                        <div style={styles.manualContainer}>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Nombre Común:</label>
                                <input
                                    type="text"
                                    name="nombre_comun"
                                    value={plantaManual.nombre_comun}
                                    onChange={manejarCambioFormularioManual}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Nombre Científico:</label>
                                <input
                                    type="text"
                                    name="nombre_cientifico"
                                    value={plantaManual.nombre_cientifico}
                                    onChange={manejarCambioFormularioManual}
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.manualContainer}>
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Frecuencia de riego (días)</label>
                                <select
                                    name="frecuencia_riego"
                                    value={plantaManual.frecuencia_riego}
                                    onChange={manejarCambioFormularioManual}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Seleccione una frecuencia</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="7">7</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            
                            <div style={styles.inputContainer}>
                                <label style={styles.label}>Frecuencia de fertilizacion (días)</label>
                                <select
                                    name="frecuencia_fertilizacion"
                                    value={plantaManual.frecuencia_fertilizacion}
                                    onChange={manejarCambioFormularioManual}
                                    style={styles.input}
                                    required
                                >
                                    <option value="">Seleccione una frecuencia</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="60">60</option>
                                    <option value="80">80</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style={styles.inputContainer}>
                            <label style={styles.label}>Descripción:</label>
                            <textarea
                                name="descripcion"
                                value={plantaManual.descripcion}
                                onChange={manejarCambioFormularioManual}
                                style={styles.input}
                                required
                            />
                        </div>

                        <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Agregar Planta'}
                        </button>

                    </form>
                ) : (
                    <form onSubmit={manejarEnvio} style={styles.form}>
                        <div style={styles.inputContainer}>
                            <label style={styles.label}>Selecciona una planta:</label>
                            <select
                                value={plantaSeleccionada}
                                onChange={manejarCambio}
                                style={styles.select}
                            >
                                <option value="">Seleccione una de las 20 plantas disponibles</option>
                                {plantas.map((planta) => (
                                    <option key={planta.id} value={planta.id}>
                                        {planta.common_name || planta.scientific_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {plantaInfo && (
                            <div style={styles.infoContainer}>
                                <p><strong>Nombre Común:</strong> {plantaInfo.common_name}</p>
                                <p><strong>Nombre Científico:</strong> {plantaInfo.scientific_name}</p>

                                <div style={styles.manualContainer}>
                                    <div style={styles.inputContainer}>
                                        <label style={styles.label}>Frecuencia de riego (días)</label>
                                        <select
                                            value={plantaInfo.frecuencia_riego}
                                            onChange={manejarCambioRiegoAPI}
                                            style={styles.select}
                                        >
                                            <option value="">Seleccione una frecuencia</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="5">5</option>
                                            <option value="7">7</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>

                                    <div style={styles.inputContainer}>
                                        <label style={styles.label}>Frecuencia de fertilizacion (días)</label>
                                        <select
                                            value={plantaInfo.frecuencia_fertilizacion}
                                            onChange={manejarCambioFertilizacionAPI}
                                            style={styles.select}
                                        >
                                            <option value="">Seleccione una frecuencia</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                            <option value="60">60</option>
                                            <option value="80">80</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Agregar Planta'}
                        </button>
                    </form>
                )}

                <button onClick={handlereturn} style={{ ...styles.submitButton, backgroundColor: 'red' }}>
                    Cancelar
                </button>
            </div>
        </div>
    );
};

const styles = {
    
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f6e5',
    },
    imageContainer: {
        position: 'relative',
        flex: '0.6',
        left: '5vh',
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    manualContainer: {
        display: 'flex',
        flexdirection: 'column',
        alignitems: 'center'
    },

    image: {
        width: '100%',
        height: 'auto',
        maxWidth: '400px',
        borderRadius: '10px',
    },

    formContainer: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '75vh',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#3b6e4f',
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputContainer: {
        marginBottom: '1rem',
        padding: '1vh',
    },
    label: {
        fontSize: '1rem',
        color: '#6b6b6b',
        marginBottom: '0.5rem',
    },
    input: {
        padding: '0.8rem',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #c3c3c3',
        outline: 'none',
        width: '100%',
        transition: 'border-color 0.3s',
    },
    select: {
        padding: '0.8rem',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #c3c3c3',
        outline: 'none',
        width: '100%',
        transition: 'border-color 0.3s',
    },
    submitButton: {
        backgroundColor: '#3b6e4f',
        color: '#fff',
        padding: '0.8rem',
        fontSize: '1.1rem',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '1rem',
    },
    toggleButton: {
        backgroundColor: '#bef766',
        color: '#fff',
        padding: '0.8rem',
        fontSize: '1rem',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginBottom: '1rem',
    },
    plantInfo: {
        marginBottom: '1rem',
        textAlign: 'left',
    },
    loadingText: {
        color: '#757575',
        textAlign: 'center',
        fontSize: '1.2rem',
    },

    errorText: {
        color: '#d9534f',
        textAlign: 'center',
        fontSize: '1.2rem',
    },
};

export default AgregarPlanta
