import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const TablaPlantasAdmin = () => {
    const [plantas, setPlantas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlanta, setSelectedPlanta] = useState(null);
    const [nombreComun, setnombreComun] = useState('');
    const [description, setDescription] = useState('');
    const [freqRiego, setFreqRiego] = useState('');
    const [freqFert, setFreqFert] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el filtro
    const navigate = useNavigate('');
    const [noAdmin, setNoAdmin] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const role = localStorage.getItem('rol');
        console.log(role);

        if(role !== "administrador"){
            setNoAdmin(true);
        } else {
            const verificarSesion = async () => {
          try {
            const response = await axios.get('http://localhost/API/verificar_sesion.php', { withCredentials: true });
            console.log(response.data)
            console.log(response.data.sesion_activa)
            if (!response.data.sesion_activa) {
              navigate('/'); // Redirige a la raíz si no hay sesión activa
            }
                } catch (error) {
                    console.error('Error al verificar la sesión:', error);
                    navigate('/');
                }
                verificarSesion();
            };
        }
        
        
    
        
      }, [navigate]);
    

    const handlereturn = () => { navigate('/administracion') }

    

    const fetchPlantas = async () => {
        try {
            const response = await axios.get('http://localhost/API/obtenerPlantasAdmin.php', { withCredentials: true });
            if (response.data && response.data.data) {
                console.log(response.data.data)
                setPlantas(response.data.data);
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

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta planta? Se eliminaran tambien las tareas asociadas')) {
            try {
                const response = await axios.delete(`http://localhost/API/eliminarPlantaAdmin.php?id=${id}`, { withCredentials: true });
                if (response.data.success) {
                    alert('Planta eliminada con éxito');
                    fetchPlantas(); // Recarga las plantas
                } else {
                    alert('Error al eliminar la planta');
                }
            } catch (err) {
                console.error('Error al eliminar la planta:', err);
                alert('Error al eliminar la planta');
            }
        }
    };

    const obtenerTips = async (planta) => {
        try {
            const openaiApiKey = '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';  // Reemplaza con tu clave de OpenAI
        
            // Realizar la solicitud a OpenAI
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: "system", content: "Eres un experto en cuidado de plantas." },
                        { role: "user", content: `Dame consejos de cuidado para la planta llamada "${planta.nombre_comun}" y algunos detalles como con que tipo de plantas esta convive mejor y con cuales no, limita tu respuesta a 300 tokens porfavor.` }
                    ],
                    max_tokens: 300
                },
                {
                    headers: {
                        'Authorization': `Bearer ${openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(planta);
            console.log(response.data.choices[0]);
            const tips = response.data.choices[0].message.content;
            
            // Mostrar los tips en una alerta (opcional)
            alert(`Tips para ${planta.nombre_comun}:\n${tips}`);

            // Guardar los tips en la base de datos
            await guardarTip(tips, planta.id);
            
        } catch (error) {
            console.error('Error al obtener los tips de cuidado:', error);
            alert('Hubo un error al obtener los tips de cuidado.');
        }
    };

    const guardarTip = async (tip, plantId) => {
        try {
            const response = await axios.post('http://localhost/API/guardarTips.php', {
                plant_id: plantId,
                tip: tip
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log(response.data);
            if (response.data.message) {
                alert("Tip guardado exitosamente");
            } else if (response.data.error) {
                alert("Error: " + response.data.error);
            }
        } catch (error) {
            console.error("Error al guardar el tip:", error);
            alert("Error al guardar el tip en la base de datos.");
        }
    };

    const handleModificar = async (id) => {
        const updatedPlanta = {
            id: id,
            nombre_comun: nombreComun,
            descripcion: description,
            frecuencia_riego: freqRiego,
            frecuencia_fertilizacion: freqFert
        };

        try {
            console.log(updatedPlanta);
            const response = await axios.put(
                'http://localhost/API/modificarPlanta.php',
                updatedPlanta, { withCredentials: true }, // Cuerpo de la solicitud
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                alert('Planta modificada con éxito');
                setSelectedPlanta(null);
                fetchPlantas(); // Recarga las plantas
            } else {
                alert('Error al modificar la planta');
            }
        } catch (err) {
            console.error('Error al modificar la planta:', err);
            alert('Error al modificar la planta');
        }
    };

    useEffect(() => {
        fetchPlantas();
    }, []);

    if(noAdmin) return <h1>No tienes permisos para ver este panel</h1>

    if (loading) return <img src = "planta8.gif" alt="CargandoGif" className='Cargando'></img>;
    if (error) return <p>{error}</p>;

    // Filtrar plantas según el término de búsqueda
    const filteredPlantas = plantas.filter(planta =>
        planta.nombre_comun.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getColorForStatus = (estado) => {
        if(estado === "Se requiere atención"){
            return <h5 className = "card-text" style={{color: 'red'}}>Estado: {estado}</h5>
        } else if(estado === "Estable"){
            return <h5 className = "card-text" style={{color: '#5bd842'}}>Estado: {estado}</h5>
        } else {
            return <h5 className = "card-text">Estado: {estado}</h5>
        }
    };

    const getImageForStatus = (estado) => {
        if(estado === "Se requiere atención"){
            return <img src = "warning.gif" alt="plantwarn" style={{width: '9vh', height: '9vh',}}></img>
        } else if(estado === "Estable"){
            return <img src = "checkPlant.gif" alt="plantcheck" style={{width: '9vh', height: '9vh',}}></img>
        } else {
            return <img src = "waitingPlant.png" alt="plantwait" style={{width: '9vh', height: '9vh',}}></img>
        }
    };

    const getCardColorForStatus = (estado) => {
        if(estado === "Se requiere atención"){
            return '#feebe3';
        } else {
            return '#f8fee5';
        }
    };

    return (
        <div className="tabla-container">
            <h1 className="text-center">Mis plantas</h1>
            <br />
            <input
                type="text"
                placeholder="Buscar por nombre común..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style = {{width: '95%', position: 'relative', left: '5vh'}}
            />
            <div className="row">
                {filteredPlantas.length > 0 ? (
                    filteredPlantas.map((planta) => (
                        <div className="col-md-4 mb-5" key={planta.id}>
                            <div className="card" style={{backgroundColor: getCardColorForStatus(planta.estado), height: '110%'}}>
                                <div className="card-body">
                                    <div className = "card-Row" style={{display: 'flex', paddingBottom: '3vh'}}>
                                        <div style={{width: '90%'}}>
                                            <h3 className="card-title">{planta.nombre_comun}</h3>
                                            <p className="card-text">{planta.descripcion}</p>
                                            <>{getColorForStatus(planta.estado)}</>
                                            <p>Tipo de planta: {planta.Nombre}</p>
                                        </div>
                                        
                                        {/*<h5 className = "card-text">Estado: {planta.estado}</h5> */}
                                        <>{getImageForStatus(planta.estado)}</>
                                    </div>

                                    <button
                                        className="btn btn-danger me-2"
                                        onClick={() => handleEliminar(planta.id)}>
                                        <img src="trashIcon.png" alt="Home" style={{width: '3vh', height: '3vh',}} />
                                    </button>
                                    
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => {
                                            setSelectedPlanta(planta);
                                            setnombreComun(planta.nombre_comun);
                                            setDescription(planta.descripcion);
                                            setFreqRiego(planta.frecuencia_riego);
                                            setFreqFert(planta.frecuencia_fertilizacion);
                                        }}>
                                        Modificar
                                    </button>

                                    {/* {/* <button
                                        className="btn btn-info me-2"
                                        onClick={() => agregarRiego(planta.id)}>
                                        Regar
                                        <img src="regar2.png" alt="Home" style={{width: '3vh', height: '3vh',}} />
                                    </button> */}

                                    <button
                                        className="btn btn-success"
                                        onClick={() => obtenerTips(planta)}>
                                        generar tips
                                        <img src="fertilizar3.png" alt="Home" style={{width: '3vh', height: '3vh',}} />
                                    </button>


                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No hay plantas disponibles</p>
                    </div>
                )}
            </div>

            {selectedPlanta && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modificar Planta</h5>
                                <button type="button" className="close" onClick={() => setSelectedPlanta(null)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre Común</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombreComun}
                                        onChange={(e) => setnombreComun(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                <label>Frecuencia de riego (días)</label>
                                    <select
                                        type="text"
                                        className="form-select"
                                        value={freqRiego}
                                        onChange={(e) => setFreqRiego(e.target.value)}
                                    >
                                        <option value="">Seleccione una frecuencia</option>
                                        <option value = "1">1</option>
                                        <option value = "2">2</option>
                                        <option value = "3">3</option>
                                        <option value = "5">5</option>
                                        <option value = "7">7</option>
                                        <option value = "10">10</option>
                                    </select>

                                </div>


                                <div className="form-group">
                                <label>Frecuencia de fertilizacion (días)</label>
                                    <select
                                        type="text"
                                        className="form-select"
                                        value={freqFert}
                                        onChange={(e) => setFreqFert(e.target.value)}
                                    >
                                        <option value="">Seleccione una frecuencia</option>
                                        <option value = "20">20</option>
                                        <option value = "30">30</option>
                                        <option value = "40">40</option>
                                        <option value = "60">60</option>
                                        <option value = "80">80</option>
                                    </select>

                                </div>
                                

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedPlanta(null)}>Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleModificar(selectedPlanta.id)}>Guardar Cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <center><button onClick={handlereturn} className='btn btn-secondary'>Regresar</button></center>
        </div>
    );
};

export default TablaPlantasAdmin;
