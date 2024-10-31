import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username'); // Obtener el nombre de usuario

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/API/logout.php', { withCredentials: true });
            localStorage.removeItem('username'); // Limpiar el nombre de usuario al cerrar sesión
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleWelcomeClick = () => {
        navigate('/modify'); 
    };

    const handleHomeClick = () => {
        navigate('/Dashboard'); 
    };

    const styles = {
        navbar: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            width: '100%',
            zIndex: 1000,
            backgroundColor: '#579c03',
            color: '#fff',
            fontSize: '1.1rem',
            height: '60px',
        },
        button: {
            backgroundColor: 'transparent',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            marginRight: '20px',
            padding: '0',
            transition: 'background-color 0.3s, transform 0.2s',
        },
        logoutButton: {
            backgroundColor: '#7dcb04',
            border: 'none',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'background-color 0.3s, transform 0.2s',
        },
        homeButton: {
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            padding: 0,
        },
        homeIcon: {
            width: '5vh',  
            height: '5vh',
        },
    };

    return (
        <div style={styles.navbar}>
            <button onClick={handleHomeClick} style={styles.homeButton}>
                <img src="home.png" alt="Home" style={styles.homeIcon} />
            </button>
            <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
            <button onClick={handleWelcomeClick} style={styles.button}>
                Bienvenido, {username}
            </button>
        </div>
    );
};

export default Navbar;
