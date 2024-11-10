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
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [responseText, setResponseText] = useState('');
  const [plantas, setPlantas] = useState([]);
  const [cantNotificaciones, setCantNotificaciones] = useState([]);
  const [cantPlantasNecesitadas, setCantPlantasNecesitadas] = useState(0)

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
        const apiKey = '2034e01ee6db87db1d46d52661469a10'; // API KEY (esto no deberia estar aqui pero es para salir del paso)
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

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (isLoaded) return; // Evitar que este useEffect se cargue doble

    const randomTip = async () => {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "Eres un experto en cuidado de plantas." },
              { role: "user", content: "Dime un tip aleatorio de jardinería directo al grano. Limita tu respuesta a 200 tokens por favor." }
            ],
            max_tokens: 200
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer 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"
            }
          }
        );
        setResponseText(response.data.choices[0].message.content);
      } catch (error) {
        console.error("Error al obtener la información de la planta:", error);
        setResponseText("No se pudo obtener la recomendación.");
      }
    };

    randomTip();
    setIsLoaded(true); // Marca el componente como cargado
  }, [isLoaded]);


  useEffect(() => {
    const fetchLastPlant = async () => {
      try {
          const response = await axios.get('http://localhost/API/obtenerPlantas.php', { withCredentials: true });
          if (response.data && response.data.data) {
              setPlantas(response.data.data.slice(0, 1));
          } else {
              setError('No se encontraron plantas');
          }
      } catch (err) {
          console.error('Error al cargar las plantas:', err);
          setError('Error al cargar las plantas');
      } finally {
          setLoading(false);
      }
    };

    fetchLastPlant();
  }, []);


  useEffect(() => {
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

  fetchNumeroNotificaciones();  

  }, [])


  useEffect(() =>{
    const fetchPlantasNecesitadasCount = async () => {
      try {
        const response = await axios.get("http://localhost/API/pendingPlantsCount.php", { withCredentials: true});
        if (response.data && response.data.success) {
          setCantPlantasNecesitadas(response.data.data);
        }

        } catch (error) {
          console.log("Ocurrio un error", error);
        }
      };
    
    fetchPlantasNecesitadasCount();
  }, [])
  


  const updateDateTime = () => {
    const now = new Date();
    const formattedDateTime = format(now, "eeee, d 'de' MMMM 'de' yyyy H:mm", { locale: es });
    setCurrentDateTime(formattedDateTime);
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const goToNewPlant = () => navigate('/agregar');
  const goToTasks = () => navigate('/mis-tareas');
  const goToModifyGarden = () => navigate('/modificar');
  const goToEncyclopedia = () => navigate('/enciclopedia');
  const goToEditProfile = () => navigate('/perfil');
  const goToRecommendations = () => navigate('/recomendaciones');
  const goToDetect = () => navigate('/detectar-planta');
  const goToNotifications = () => navigate('/mis-notificaciones')

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
        loading ? (
          <img src="planta8.gif" alt="CargandoGif" className="Cargando" />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
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

            <div className="leftContainer">
              <button className="notificacionesWidget" onClick={goToNotifications}>
                <h2 className="textoNotificaciones">Tienes {cantNotificaciones[0]?.Cant_Notificaciones || ""} notificaciones pendientes</h2>
                <img src = "campanaIcon.png" className = "nIcon" alt = "campana"></img>
              </button>

              <div className="plantasWidget">
                <h2 className="textoPlantasNecesitadas">Hay {cantPlantasNecesitadas} plantas que requieren atención. ¡No te olvides de ellas!</h2>
                <img src = "planta9.gif"  style = {{width: '20vh', height: '20vh'}} alt = "campana"></img>
              </div>
            </div>
          </div>
        )
      )}

      <div className="secondTopBar">
        <div className="uniquePlantContainer">
          <div className="imagePlanta">
            <img src="planta6.gif" alt="Ingresar nueva planta" className="plantGif" />
          </div>
          <div className="infoPlanta">
            <h2 className="lastPlant">Última planta ingresada:</h2>
            {plantas.map((planta, index) => (
                <div key={index}>
                    <h2 className='lastPlant'> {planta.nombre_comun}</h2>
                </div>
            ))}
          </div>
        </div>

        <div className="randomTipContainer">
          <h2 className="tipText">Tip</h2>
          <div className="response-tip">
            <h1 className="myTip">{responseText || <img src="planta8.gif" alt="CargandoGif" className="Cargando" />}</h1>
          </div>
        </div>
      </div>

      <h2 className="selectionText">¿Qué deseas hacer?</h2>
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
          <span>Recomendaciones para mis plantas</span>
        </div>
        <div className="dashboard-btn" onClick={goToDetect}>
          <img src="lupaPlanta.png" alt="Detectar planta" className="dashboard-icon" />
          <span>Detectar planta</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
