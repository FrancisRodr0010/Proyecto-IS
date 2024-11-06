import './ImageAnalizer.css';
import React, { useState } from 'react';
import axios from 'axios';

const ImageAnalyzer = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [labels, setLabels] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const analyzeImage = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/analyze-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLabels(response.data);
        } catch (error) {
            console.error('Error al analizar la imagen:', error);
        }
    };

    return (
        <div className="analyzer-container">
            <div className="text-container">
                <h1>¿Problemas para identificar tu planta?</h1>
                <p className="subtext">Prueba a identificar tu planta subiendo una imagen</p>
            </div>

            <div className="analyzer-card">
                <input className='mt-5' type="file" onChange={handleFileChange} accept="image/*" />
                <button onClick={analyzeImage}>Analizar Imagen</button>
                
                {selectedFile && (
                    <div className="image-preview">
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected" className="preview-img" />
                    </div>
                )}

                <div className="labels">
                    {labels.map((label, index) => (
                        <div key={index} className="label-item">
                            <strong>{label.Name}</strong>: {label.Confidence.toFixed(2)}%
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageAnalyzer;
