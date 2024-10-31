import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns'; 
import { es } from 'date-fns/locale';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');


  useEffect(() => {

    window.scrollTo(0, 0);
    const verificarSesion = async () => {
      try {
        const response = await axios.get('http://localhost/API/verificar_sesion.php', { withCredentials: true });
        if (!response.data.sesion_activa) {
          navigate('/'); // Redirige a la raíz si no hay sesión activa
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        navigate('/');
      }
    };
    verificarSesion();

    const fetchWeather = async (latitude, longitude) => {
      try {
        const apiKey = '2034e01ee6db87db1d46d52661469a10'; // API KEY
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: 'metric',
            lang: 'es'
          }
        });
        setWeather(weatherResponse.data);
      } catch (error) {
        console.error('Error al obtener datos del clima:', error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }, [navigate]);


  const updateDateTime = () => {
    const now = new Date();
    const formattedDateTime = format(now, "eeee, d 'de' MMMM 'de' yyyy H:mm", { locale: es });
    setCurrentDateTime(formattedDateTime);
  };


  useEffect(() => {
    // Llama a la función al montar el componente
    updateDateTime();
    
    // Configura el intervalo para actualizar la fecha y hora cada segundo
    const intervalId = setInterval(updateDateTime, 1000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const goToNewPlant = () => navigate('/agregar');
  const goToTasks = () => navigate('/mis-tareas');
  const goToModifyGarden = () => navigate('/modificar');
  const goToEncyclopedia = () => navigate('/enciclopedia');
  const goToEditProfile = () => navigate('/perfil');
  const goToRecommendations = () => navigate('/recomendaciones');
  const goToDetect = () => navigate('/detectar-planta');

  

  return (
    <div className="dashboard-container">
      {/* Hero Image */}
      <div className="hero-image">
        <h1>Gestión de Plantas</h1>
        <h5>Monitorea y cuida de tus plantas con facilidad.</h5>
      </div>

      <br />
      <br />

      <div className="date-time">
          <h2>{currentDateTime}</h2>
      </div>
      
      <br />
      <br />

      {/* Widget de Clima */}
      {weather && (
      <div className="top-bar">
        <div className="weather-widget">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Icono de clima"
            className="weather-icon"
          />
          <div className="weather-info">
            <h2 className="temp">{Math.round(weather.main.temp)}°C</h2>
            <p className="location">{weather.name}</p>
            <div className="additional-info">
              <h4>{weather.weather[0].description}</h4>
              <p>Humedad: {weather.main.humidity}%</p>
              <p>Viento: {Math.round(weather.wind.speed * 3.6)} km/h</p>
            </div>
          </div>
        </div>
      </div>
      )}

      <h2 className="selectionText">¿Que deseas hacer?</h2>
      <br />
      <br />

      <div className="button-grid">
        <div className="dashboard-btn" onClick={goToNewPlant}>
          <img src="planta1.png" alt="Ingresar nueva planta" className="dashboard-icon" />
          <span>Ingresar nueva planta</span>
        </div>
        <div className="dashboard-btn" onClick={goToTasks}>
          <img src="planta3.png" alt="Crear nuevo huerto" className="dashboard-icon" />
          <span>Inspeccionar tareas</span>
        </div>
        <div className="dashboard-btn" onClick={goToModifyGarden}>
          <img src="planta2.png" alt="Modificar huerto" className="dashboard-icon" />
          <span>Modificar huerto - Ver mis plantas</span>
        </div>
        <div className="dashboard-btn" onClick={goToEncyclopedia}>
          <img src="enciclopedia.png" alt="Enciclopedia" className="dashboard-icon" />
          <span>Enciclopedia</span>
        </div>
        <div className="dashboard-btn" onClick={goToEditProfile}>
          <img src="perfiledit.png" alt="Editar Perfil" className="dashboard-icon" />
          <span>Perfil</span>
        </div>
        <div className="dashboard-btn" onClick={goToRecommendations}>
          <img src="planta4.png" alt="Recomendaciones" className="dashboard-icon" />
          <span>Recomendaciones</span>
        </div>

        <div className="dashboard-btn" onClick={goToDetect}>
          <img src="planta4.png" alt="Recomendaciones" className="dashboard-icon" />
          <span>Detectar planta</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
