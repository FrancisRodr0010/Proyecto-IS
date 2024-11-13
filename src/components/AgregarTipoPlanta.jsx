import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgregarTipoPlanta = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [noAdmin, setNoAdmin] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);

        const role = localStorage.getItem('rol');
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !descripcion) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        const tipoPlanta = { nombre, descripcion };

        try {
            const response = await axios.post('http://localhost/API/agregarTipoPlanta.php',  tipoPlanta, { withCredentials: true },);
            if (response.data.success) {
                setSuccess('Tipo de planta agregado correctamente');
                setNombre('');
                setDescripcion('');
            } else {
                setError('Error al agregar el tipo de planta.');
            }
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al agregar el tipo de planta');
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: '#e5fbe7'
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px'
    };

    const formGroupStyle = {
        marginBottom: '15px'
    };

    const labelStyle = {
        marginBottom: '5px',
        display: 'block'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer'
    };

    const alertStyle = {
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '15px',
        textAlign: 'center'
    };

    const errorStyle = {
        ...alertStyle,
        backgroundColor: '#f8d7da',
        color: '#721c24'
    };

    const successStyle = {
        ...alertStyle,
        backgroundColor: '#d4edda',
        color: '#155724'
    };

    if(noAdmin) return <h1>No tienes permisos para ver este panel</h1>

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Agregar Tipo de Planta</h2>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Nombre</label>
                    <input
                        type="text"
                        style={inputStyle}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Descripción</label>
                    <textarea
                        style={inputStyle}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                {error && <div style={errorStyle}>{error}</div>}
                {success && <div style={successStyle}>{success}</div>}
                <button type="submit" style={buttonStyle}>Agregar</button>
            </form>
        </div>
    );
};

export default AgregarTipoPlanta;
