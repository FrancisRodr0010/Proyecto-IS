import React, { useState } from 'react';
import axios from 'axios';

const PlantScanner = () => {
    const [image, setImage] = useState(null);
    const [results, setResults] = useState([]);

    // Función para capturar la imagen
    const captureImage = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, 640, 480);
        const imageData = canvas.toDataURL("image/jpeg").split(',')[1]; // Base64 sin el prefijo
        setImage(`data:image/jpeg;base64,${imageData}`);
        video.pause();

        return imageData;
    };

    // Función para enviar la imagen al backend
    const scanPlant = async () => {
        const imageBase64 = await captureImage();
        try {
            const response = await axios.post("http://localhost/tu-servidor/plant-scanner.php", { image: imageBase64 });
            setResults(response.data);
        } catch (error) {
            console.error("Error al analizar la planta:", error);
        }
    };

    return (
        <div>
            <button onClick={scanPlant}>Escanear Planta</button>
            {image && <img src={image} alt="Imagen de la planta" />}
            {results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlantScanner;
