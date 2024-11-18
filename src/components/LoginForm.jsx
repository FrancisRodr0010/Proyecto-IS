import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://13.57.192.47/API/login.php", {
                email,
                password,
            }, { withCredentials: true });
            if (response.data.success) {
                localStorage.setItem('userID', response.data.user_id);
                localStorage.setItem('email', response.data.session.email);
                localStorage.setItem('username', response.data.session.username);
                console.log(response.data);
                navigate('/Dashboard');
            } else {
                alert("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div style={styles.container}>


            <div style={styles.formContainer}>
                <h2 style={styles.title}>Iniciar Sesión en GreenManage</h2>
                <p style={styles.subtitle}>Administra y cuida tu jardín</p>
                <form onSubmit={handleLogin} style={styles.form}>
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
                    <button type="submit" style={styles.loginButton}>Iniciar Sesión</button>
                    <button
                        onClick={() => navigate('/Signup')}
                        type="button"
                        style={styles.signupButton}
                    >
                        Crear Cuenta
                    </button>
                </form>
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
        backgroundImage: 'url(https://www.floristeriamorris.com/wp-content/uploads/etapas-de-crecimiento-de-las-plantas.jpg)',
        backgroundSize: 'cover',
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#c0ff88',
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#c9e779',
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
        color: 'white',
        marginBottom: '0.5rem',
    },
    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
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
        backgroundColor: '#cbdc55',
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
        maxWidth: '400px',
        borderRadius: '10px',
    },
};

export default LoginForm;
