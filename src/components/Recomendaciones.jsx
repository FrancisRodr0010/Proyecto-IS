import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Recomendaciones = () => {
    const [plantRecommendations, setPlantRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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

    useEffect(() => {
        setIsLoading(true);
        const fetchPlantRecommendations = async () => {
            try {
                const response = await axios.get("http://localhost/API/getPlantsforTips.php", {
                    withCredentials: true,
                });
                if (response.data.success) {                   
                    setPlantRecommendations(response.data.data);
                }
            } catch (error) {
                console.error("Error al obtener recomendaciones de plantas:", error);
            }
            setIsLoading(false);
        };

        fetchPlantRecommendations();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="loading">
                    <img src="planta8.gif" alt="CargandoGif" style={{ width: '9vh', height: '9vh' }} />
                    <p>Cargando...</p>
                </div>
            ) : (
                <div style={styles.container}>
                    <h2 style={styles.title}>Recomendaciones de Cuidado para tus Plantas</h2>
                    <div style={styles.grid}>
                        {plantRecommendations.length > 0 ? (
                            plantRecommendations.map((plant, index) => (
                                <div key={index} style={styles.card}>
                                    <img
                                        src="planta5.png"
                                        alt="Imagen de planta"
                                        style={styles.image}
                                    />
                                    <div style={styles.textContainer}>
                                        <h3 style={styles.plantName}>{plant.nombre_comun}</h3>
                                        <p style={styles.recommendation}>
                                            {plant.consejo}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <img src="planta8.gif" alt="CargandoGif" style={styles.loadingGif} />
                                <p>Cargando...</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    loadingGif: {
        width: '50px',
        height: '50px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        minHeight: '100vh',
    },
    title: {
        fontSize: '2em',
        color: '#4CAF50',
        marginBottom: '20px',
        textAlign: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f2ffe6',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '40vh',
        borderRadius: '8px',
        objectFit: 'cover',
        marginBottom: '10px',
    },
    textContainer: {
        padding: '10px',
    },
    plantName: {
        fontSize: '1.2em',
        color: '#333',
        margin: '10px 0 5px 0',
    },
    recommendation: {
        fontSize: '1em',
        color: '#555',
    },
};

export default Recomendaciones;
