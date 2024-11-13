import React, { useState, useEffect } from 'react';

function AgregarPlanta() {
    const [plants, setPlants] = useState([]);
    const [selectedPlantId, setSelectedPlantId] = useState("");
    const [message, setMessage] = useState("");

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

        const selectedPlant = plants.find(plant => plant.id === selectedPlantId);

        if (!selectedPlant) {
            alert("La planta seleccionada no fue encontrada.");
            return;
        }

        const data = {
            nombre_comun: selectedPlant.nombre_comun,
            nombre_cientifico: selectedPlant.nombre_cientifico,
            descripcion: selectedPlant.descripcion,
            frecuencia_riego: selectedPlant.frecuencia_riego,
            frecuencia_fertilizacion: selectedPlant.frecuencia_fertilizacion
        };

        try {
            const response = await fetch("http://localhost/API/agregarPlanta.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true"
                },
                credentials: "include",
                body: JSON.stringify(data)
            });

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            console.error("Error al guardar la planta:", error);
            setMessage("Hubo un error al intentar guardar la planta.");
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                padding: '20px',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h2>¿Qué planta deseas agregar?</h2>
                <select onChange={handleSelectChange} value={selectedPlantId} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
                    <option value="" disabled>Selecciona una planta...</option>
                    {plants.map(plant => (
                        <option key={plant.id} value={plant.id}>
                            {plant.nombre_comun} - {plant.nombre_cientifico}
                        </option>
                    ))}
                </select>
                <button onClick={handleSavePlant} style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>Guardar Planta</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default AgregarPlanta;
