import './ImageAnalizer.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [labels, setLabels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect (() => {
        window.scrollTo(0,0);
    }, []);
        

    const analyzeImage = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/analyze-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLabels(response.data);
        } catch (error) {
            console.error('Error al analizar la imagen:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="analyzer-container">
            <div className="text-container">
                <h2>¿Problemas para identificar tu planta?</h2>
                <p className="subtext">Prueba a identificar tu planta subiendo una imagen</p>
            </div>
            <div className="cards-container">
                {/* Card para seleccionar imagen */}
                <div className="iCard select-card">
                    <h3 style={{color: "#6e7a02"}}>Selecciona tu imagen</h3>
                    <input
                        className="inputButton"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <button className="submitImageButton" onClick={analyzeImage}>Analizar Imagen</button>
                    {selectedFile && (
                        <div className="image-preview">
                            <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="preview-img" />
                        </div>
                    )}
                </div>

                {/* Card para mostrar resultados */}
                <div className="iCard results-card">
                    <h3 style={{color: "#6e7a02", textAlign: 'Center'}}>Resultados de análisis</h3>
                    <div className="labels">
                        {isLoading ? (
                            <div className="loading">
                                <img src="planta8.gif" alt="CargandoGif" style={{ width: '9vh', height: '9vh' }} />
                                <p>Cargando...</p>
                            </div>
                        ) : (
                            labels.length > 0 ? (
                                labels.map((label, index) => (
                                    <div key={index} className="label-item">
                                        ✓ <strong>{label.Name}</strong>: {label.Confidence.toFixed(2)}%
                                    </div>
                                ))
                            ) : (
                                <p>Esperando imagen...</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageAnalyzer;
