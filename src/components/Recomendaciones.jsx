import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Recomendaciones = () => {
    const [plantNames, setPlantNames] = useState([]);
    const [recommendations, setRecommendations] = useState({});
    const isMounted = useRef(false);

    const navigate = useNavigate();
    useEffect(() => {
        const verificarSesion = async () => {
          try {
            const response = await axios.get('http://localhost/API/verificar_sesion.php', { withCredentials: true });
            console.log(response.data)
            console.log(response.data.sesion_activa)
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

    

    useEffect(() => {
        if (!isMounted.current) { 
            axios.get("http://localhost/API/getPlantNames.php")
                .then(response => setPlantNames(response.data))
                .catch(error => console.error("Error al obtener nombres de plantas:", error));
            isMounted.current = true;
        }
    }, []);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchRecommendations = useCallback(async () => {
        const newRecommendations = {};
        const batchSize = 5;

        for (let i = 0; i < plantNames.length; i += batchSize) {
            const batch = plantNames.slice(i, i + batchSize);
            const requests = batch.map(name =>
                axios.post("https://api.openai.com/v1/chat/completions", {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Eres un experto en cuidado de plantas." },
                        { role: "user", content: `Dame recomendaciones sobre la planta llamada: ${name}. Si consideras que no es una planta o flor indicalo. Por favor, limita tu respuesta a 200 tokens y asegúrate de que la información sea coherente.` }
                    ],
                    max_tokens: 200
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer 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" // Asegúrate de reemplazar con tu clave API
                    }
                }).then(response => {
                    newRecommendations[name] = response.data.choices[0].message.content;
                }).catch(error => {
                    console.error(`Error al obtener recomendación para ${name}:`, error);
                    newRecommendations[name] = "No se pudo obtener la recomendación.";
                })
            );
            await Promise.all(requests);
            await sleep(2000);
        }

        setRecommendations(newRecommendations);
    }, [plantNames]);

    useEffect(() => {
        if (plantNames.length > 0) {
            fetchRecommendations();
        }
    }, [plantNames, fetchRecommendations]);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Recomendaciones de Cuidado para tus Plantas</h2>
            <div style={styles.grid}>
                {plantNames.map(name => (
                    <div key={name} style={styles.card}>
                        <img
                            src="planta5.png"
                            alt="Imagen de planta"
                            style={styles.image}
                        />
                        <div style={styles.textContainer}>
                            <h3 style={styles.plantName}>{name}</h3>
                            <p style={styles.recommendation}>
                                {recommendations[name] || "Estamos buscando informacion breve sobre tu planta..."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
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
