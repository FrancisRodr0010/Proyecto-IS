import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModifyProfile = () => {
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

    const [newUsername, setNewUsername] = useState(localStorage.getItem('username') || '');
    const [userId, setUserId] = useState(null);
    const [actualPassword, sendActualPassword] = useState('');

    useEffect(() => {
        const userIdFromSession = localStorage.getItem('userID');
        const usernameFromSession = localStorage.getItem('username');
        if (userIdFromSession && usernameFromSession) {
            setUserId(userIdFromSession);
            setNewUsername(usernameFromSession);
        }
    }, []);

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/API/deleteProfile.php', {
                userId,
                actualPsw: actualPassword,
            }, { withCredentials: true });
    
            if (response.data.success) {
                alert('Se eliminó la cuenta');
                localStorage.removeItem('userID');
                navigate('/');
            } else {
                alert(response.data.message || "Hubo un error inesperado");
            }
        } catch (err) {
            console.error('Error al borrar la cuenta:', err);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Borrar perfil</h2>
                <h2 style={styles.label}>Que lastima que te nos vayas</h2>
                <form onSubmit={handleDeleteUser} style={styles.form}>
                    
                    <div style={styles.inputContainer}>
                        <label htmlFor="actualPassword" style={styles.label}>Escribe tu contraseña</label>
                        <input
                            type="password"
                            id="actualPassword"
                            value={actualPassword}
                            onChange={(e) => sendActualPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    
                    <button type="submit" style={styles.updateButton}>Borrar cuenta</button>
                    <button onClick={() => navigate('/perfil')} type="button" style={styles.cancelButton}>Cancelar</button>
                </form>
            </div>
            <div style={styles.imageContainer}>
                <img src="userImage.png" alt="Gestión de Perfil" style={styles.image} />
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
        //backgroundColor: '#f3f6e5',
        paddingLeft: '15vw'
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#3b6e4f',
        marginBottom: '0.5rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputContainer: {
        marginBottom: '1rem',
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
    updateButton: {
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
    cancelButton: {
        backgroundColor: '#d9534f',
        color: '#fff',
        padding: '0.8rem',
        fontSize: '1rem',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '1rem',
    },
    imageContainer: {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '2rem',
    },
    image: {
        width: '100%',
        height: 'auto',
        maxWidth: '350px',
        borderRadius: '10px',
    },
};

export default ModifyProfile;
