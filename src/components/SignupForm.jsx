import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost/API/sign.php", {
                email,
                username,
                password,
            });
            if (response.data.message) {
                navigate('/');
                alert("Cuenta creada con éxito");
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Crear Cuenta en GreenManage</h2>
                <p style={styles.subtitle}>Empieza a gestionar tu jardín</p>
                <form onSubmit={handleSignup} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <label htmlFor="email" style={styles.label}>Correo</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="username" style={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label htmlFor="password" style={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.signupButton}>Crear Cuenta</button>
                    <button
                        onClick={() => navigate('/')}
                        type="button"
                        style={styles.cancelButton}
                    >
                        Cancelar
                    </button>
                </form>
            </div>
            <div style={styles.imageContainer}>
                <img src="naturaleza1.png" alt="Gestión de Plantas" style={styles.image} />
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
    subtitle: {
        fontSize: '1rem',
        color: '#757575',
        marginBottom: '2rem',
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
    loginButton: {
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
    signupButton: {
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
        maxWidth: '400px',
        borderRadius: '10px',
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
};

export default SignupForm;
