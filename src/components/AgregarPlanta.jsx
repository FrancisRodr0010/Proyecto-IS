import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AgregarPlanta() {
    const navigate = useNavigate();
    const [plants, setPlants] = useState([]);
    const [selectedPlantId, setSelectedPlantId] = useState("");
    const [message, setMessage] = useState("");

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

    }, []);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch("http://localhost/API/getOptions.php");
                const data = await response.json();

                const formattedData = data.map(plant => ({
                    ...plant,
                    id: Number(plant.id),
                    frecuencia_riego: Number(plant.frecuencia_riego),
                    frecuencia_fertilizacion: Number(plant.frecuencia_fertilizacion)
                }));

                setPlants(formattedData);
            } catch (error) {
                console.error("Error al obtener las plantas:", error);
            }
        };

        fetchPlants();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedPlantId(Number(event.target.value));
    };

    const handleSavePlant = async () => {
        if (!selectedPlantId) {
            alert("Selecciona una planta para guardar.");
            return;
        }

        const selectedPlant = plants.find((plant) => plant.id === selectedPlantId);

        if (!selectedPlant) {
            alert("La planta seleccionada no fue encontrada.");
            return;
        }

        const data = {
            nombre_comun: selectedPlant.nombre_comun,
            nombre_cientifico: selectedPlant.nombre_cientifico,
            descripcion: selectedPlant.descripcion,
            frecuencia_riego: selectedPlant.frecuencia_riego,
            frecuencia_fertilizacion: selectedPlant.frecuencia_fertilizacion,
            id_Tipo: selectedPlant.id_tipo,
        };

        console.log(data);

        try {
            const response = await fetch("http://localhost/API/agregarPlanta.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await response.json();
            setMessage(result.message);
            navigate('/modificar');
        } catch (error) {
            console.error("Error al guardar la planta:", error);
            setMessage("Hubo un error al intentar guardar la planta.");
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.cardContainer}>
            <div style={styles.imageContainer}>
                <img src="planta10.png" alt="Planta" style={styles.image} />
            </div>
                <div style={styles.card}>
                    <h2 style={styles.title}>¿Qué planta deseas agregar?</h2>
                    <select
                        onChange={handleSelectChange}
                        value={selectedPlantId}
                        style={styles.select}
                    >
                        <option value="" disabled>Selecciona una planta...</option>
                        {plants.map(plant => (
                            <option key={plant.id} value={plant.id}>
                                {plant.nombre_comun} - {plant.nombre_cientifico}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSavePlant} style={styles.saveButton}>Guardar Planta</button>
                    {message && <p>{message}</p>}
                </div>
            </div>
            <div style={styles.imageContainer}>
                <img src="planta10.png" alt="Planta" style={styles.image} />
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        paddingLeft: '5%'
    },
    cardContainer: {
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        marginRight: '20px',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        width: '350px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4fdf1', // Color verde claro de fondo para el card
        border: '2px solid #4CAF50', // Borde verde
    },
    title: {
        fontSize: '1.5em',
        color: '#4CAF50',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    select: {
        width: '100%',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '1em',
        borderRadius: '6px',
        border: '1px solid #4CAF50',
        backgroundColor: '#f2fff1', // Fondo suave para el select
    },
    saveButton: {
        padding: '12px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s',
    },
    saveButtonHover: {
        backgroundColor: '#45a049',
    },
    message: {
        marginTop: '10px',
        color: '#555',
        fontSize: '1em',
    },
    imageContainer: {
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    image: {
        width: '100%',
        maxWidth: '70vh',
        opacity: 0.2
    },
};

export default AgregarPlanta;
