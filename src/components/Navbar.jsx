import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [cantNotificaciones, setCantNotificaciones] = useState([]);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost/API/logout.php', { withCredentials: true });
            localStorage.removeItem('username');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const fetchNumeroNotificaciones = async () => {
        try {
            const response = await axios.get("http://localhost/API/getCantNotifications.php", { withCredentials: true });
            if (response.data && response.data.data) {
                setCantNotificaciones(response.data.data.slice(0, 1));
            }
        } catch (error) {
            console.log("Ocurrio un error", error);
        }
    };

    useEffect(() => {
        fetchNumeroNotificaciones();
        const intervalId = setInterval(fetchNumeroNotificaciones, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleWelcomeClick = () => {
        navigate('/perfil');
    };

    const handleNotifications = () => {
        navigate('/mis-notificaciones');
    };


    const handleHomeClick = () => navigate('/Dashboard');
    const goToTasks = () => navigate('/mis-tareas');
    const goToModifyGarden = () => navigate('/modificar');

    const styles = {
        navbar: {
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            width: '100%',
            backgroundColor: '#579c03',
            color: '#fff',
            fontSize: '1.1rem',
            height: '60px',
            zIndex: 1000,
        },
        notificationButton: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            position: 'relative',
            fontSize: '1.2rem',
            marginRight: 'auto',
            padding: '0',
        },
        badge: {
            position: 'absolute',
            top: '5px',
            right: '5px',
            backgroundColor: '#dc3545',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '0.8rem',
        },
        title: {
            backgroundColor: 'transparent',
            border: 'none',
            width: '50%',
            color: '#b6fa59',
            textAlign: 'center',
            flexGrow: 1,
            margin: 0,
            fontSize: '4vh',
            fontWeight: '500',
        },
        welcomeContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginLeft: 'auto',
        },
        navButton: {
            backgroundColor: 'transparent',
            color: '#d6fccc',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
        },
        logoutButton: {
            backgroundColor: '#7dcb04',
            border: 'none',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '4px',
            marginLeft: '10px',
        },

        bell: {
            width: '3vh',
            height: '3vh',
        }
    };

    return (
        <div style={styles.navbar}>
            <button onClick={handleNotifications} type="button" className="btn btn-success position-relative">
                <img src="campana2.png" alt="Home" style={styles.bell} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantNotificaciones[0]?.Cant_Notificaciones || 0}
                    <span className="visually-hidden">unread messages</span>
                </span>
            </button>

            <button onClick={handleHomeClick} style={styles.title}>GreenManage</button>

            <div style={styles.welcomeContainer}>
                <button onClick={goToModifyGarden} style={styles.navButton}>Mis plantas</button>
                <button onClick={goToTasks} style={styles.navButton}>Tareas</button>
                <button onClick={handleWelcomeClick} style={styles.navButton}>
                    Bienvenido, {username}
                </button>
                <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Navbar;
