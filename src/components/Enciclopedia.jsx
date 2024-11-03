/*import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Enciclopedia.css'; // Importar el archivo de estilos
import { useNavigate } from 'react-router-dom';

const Enciclopedia = () => {
    const navigate = useNavigate();
    const handlereturn = () => {navigate('/Dashboard')}
    const [plantas, setPlantas] = useState([
        
        {
            nombre: 'Aloe Vera',
            descripcion: 'Planta suculenta conocida por sus propiedades medicinales y su capacidad para almacenar agua.',
            cuidados: 'Riego moderado, luz indirecta, temperatura cálida. Se recomienda no regar en exceso.',
            tips: 'Usar el gel de aloe vera para quemaduras y heridas.',
            recomendaciones: 'Colocarla en un lugar donde reciba luz brillante, pero no luz solar directa.'
        },
        {
            nombre: 'Pothos',
            descripcion: 'Planta de interior fácil de cuidar, ideal para principiantes. Crece bien en diversas condiciones.',
            cuidados: 'Riego semanal, luz indirecta, puede crecer en agua o tierra.',
            tips: 'Corta las hojas amarillas para fomentar un crecimiento saludable.',
            recomendaciones: 'Perfecta para colgar o en estanterías altas.'
        },
        {
            nombre: 'Ficus Elástica',
            descripcion: 'Planta de hojas grandes, excelente para purificar el aire. Se adapta bien a interiores.',
            cuidados: 'Riego moderado, luz brillante, temperatura media. No le gusta el frío.',
            tips: 'Limpia las hojas con un paño húmedo para mantenerlas brillantes.',
            recomendaciones: 'No moverla demasiado, ya que puede perder hojas.'
        },
        {
            nombre: 'Sansevieria',
            descripcion: 'Conocida como lengua de suegra, es una planta resistente y de bajo mantenimiento.',
            cuidados: 'Riego cada 2-3 semanas, luz indirecta. Resistente a condiciones adversas.',
            tips: 'Ideal para principiantes, tolera la falta de luz y agua.',
            recomendaciones: 'Puede crecer en macetas pequeñas debido a su sistema de raíces compacto.'
        },
        {
            nombre: 'Cactus',
            descripcion: 'Planta suculenta que requiere poco riego y puede sobrevivir en climas secos.',
            cuidados: 'Riego cada 2-3 semanas en verano, luz solar directa, requiere buen drenaje.',
            tips: 'Evita el agua en la base de la planta para prevenir la pudrición de raíces.',
            recomendaciones: 'Colocar en un lugar soleado y caliente.'
        },
        {
            nombre: 'Orquídea',
            descripcion: 'Planta exótica que florece de manera espectacular. Requiere cuidados específicos.',
            cuidados: 'Riego semanal, luz indirecta brillante, aireación adecuada.',
            tips: 'Usar fertilizante especial para orquídeas cada dos semanas durante el crecimiento.',
            recomendaciones: 'No dejar agua en el fondo de la maceta.'
        },
        {
            nombre: 'Lavanda',
            descripcion: 'Planta aromática conocida por sus flores moradas y su agradable fragancia.',
            cuidados: 'Riego moderado, luz solar directa, buen drenaje.',
            tips: 'Recortar las flores secas para fomentar un nuevo crecimiento.',
            recomendaciones: 'Colocarla en un lugar soleado, ideal para jardines o balcones.'
        },
        {
            nombre: 'Girasol',
            descripcion: 'Planta anual conocida por sus grandes flores que siguen el sol.',
            cuidados: 'Riego frecuente, luz solar directa, suelo fértil.',
            tips: 'Girar la planta regularmente para asegurar un crecimiento uniforme.',
            recomendaciones: 'Plantar en lugares donde reciba al menos 6 horas de luz solar al día.'
        },
        {
            nombre: 'Rosa',
            descripcion: 'Flor clásica y popular en una amplia variedad de colores. Requiere ciertos cuidados para florecer bien.',
            cuidados: 'Riego regular, luz solar directa, buen drenaje.',
            tips: 'Poda las rosas muertas para estimular nuevas flores.',
            recomendaciones: 'Proteger de plagas como pulgones y usar abono regularmente.'
        },
        {
            nombre: 'Helecho',
            descripcion: 'Planta frondosa ideal para interiores, que prospera en ambientes húmedos.',
            cuidados: 'Riego regular, luz indirecta, ambiente húmedo.',
            tips: 'Rociar con agua para mantener la humedad y evitar que las hojas se sequen.',
            recomendaciones: 'Perfecta para baños o áreas húmedas con luz moderada.'
        },
        {
            nombre: 'Hortensia',
            descripcion: 'Arbusto florido con grandes racimos de flores. El color de las flores varía según el pH del suelo.',
            cuidados: 'Riego abundante, luz indirecta o semisombra, suelos ricos en nutrientes.',
            tips: 'Añadir sulfato de aluminio para hacer que las flores se vuelvan más azules.',
            recomendaciones: 'Evitar la exposición prolongada al sol directo en climas cálidos.'
        },
        {
            nombre: 'Begonia',
            descripcion: 'Planta decorativa conocida por sus flores vibrantes y hojas coloridas.',
            cuidados: 'Riego moderado, luz indirecta, evitar el encharcamiento.',
            tips: 'Retirar las flores marchitas para prolongar la floración.',
            recomendaciones: 'Colocar en macetas colgantes o en estanterías para resaltar sus hojas.'
        },
        {
            nombre: 'Clavel',
            descripcion: 'Flor perenne con pétalos arrugados y colores brillantes, popular en arreglos florales.',
            cuidados: 'Riego moderado, luz solar directa, suelos bien drenados.',
            tips: 'Proporcionar apoyo a los tallos para evitar que se doblen bajo el peso de las flores.',
            recomendaciones: 'Cortar los claveles a ras de suelo para fomentar un crecimiento vigoroso.'
        },
    ]);

    return (
        <div className='container mt-5 text-center'>
            <h1>Mini Enciclopedia de Plantas</h1>
            <br />

            <h3>Algunas recomendaciones a considerar para tu huerto</h3>
            <br />

            <div className="container text-center" style={{ width: '70%' }}>
                <div className="row">
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Conocer el espacio y el clima: Antes de plantar, observa tu jardín.
                Evalúa la cantidad de luz solar que recibe a lo largo del día y considera las características del suelo.
                Algunas plantas requieren sol pleno, mientras que otras prosperan en sombra parcial.
                Además, infórmate sobre las condiciones climáticas de tu región para elegir las especies adecuadas.
                    </div>
                    <div className="col">
                    <img src="clima.png" style={{ width: '25vh', height: '25vh' }} alt="Clima" />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col">
                        <img src="entorno.png" style={{ width: '45vh', height: '25vh' }} alt="Planta 2" />
                    </div>
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Selección de plantas: Es fundamental elegir plantas que se adapten bien a tu entorno.
                Comienza con especies resistentes y de bajo mantenimiento, como geranios, petunias o hierbas aromáticas.
                Puedes investigar sobre plantas nativas, ya que suelen requerir menos agua y cuidados, y son más resistentes a plagas.
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div className="row">
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Planificación y diseño: Antes de comenzar a plantar, es útil diseñar tu jardín.
                    Considera la altura y el color de las plantas al ubicarlas. Las plantas más altas deben ir en la parte posterior,
                    mientras que las más bajas deben estar al frente. Esto no solo mejorará la estética,
                    sino que también asegurará que todas las plantas reciban la luz adecuada.
                    </div>
                    <div className="col">
                        <img src="jardin1.png" style={{ width: '25vh', height: '25vh' }} alt="Regadera" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <img src="regar.png" style={{ width: '25vh', height: '25vh' }} alt="Planta 2" />
                    </div>
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Riego adecuado: El riego es una parte crucial del cuidado de las plantas.
                    Asegúrate de no excederte ni quedarte corto. La mayoría de las plantas prefieren un riego profundo y menos
                    frecuente en lugar de riegos superficiales y diarios. Utiliza un sistema de riego por goteo
                    o riega en la mañana para evitar la evaporación rápida.
                    </div>
                </div>
                <br />
                <br />
                <br />

                <div className="row">
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Fertilización y mantenimiento: Las plantas necesitan nutrientes para crecer saludables.
                Utiliza fertilizantes orgánicos o compost para enriquecer el suelo. Realiza una limpieza regular en tu jardín,
                eliminando malas hierbas y flores marchitas para promover un crecimiento saludable y evitar plagas.
                    </div>
                    <div className="col">
                        <img src="fertilizar.png" style={{ width: '25vh', height: '25vh' }} alt="Regadera" />
                    </div>
                </div>

                <br />
                <br />
                <br />

                <div className="row">
                    <div className="col">
                        <img src="lupa.png" style={{ width: '25vh', height: '25vh' }} alt="Planta 2" />
                    </div>
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Observación y aprendizaje: La jardinería es un proceso de aprendizaje continuo. Observa cómo crecen tus plantas
                    y cómo interactúan con el entorno. No te desanimes si algunas plantas no prosperan; cada error es una oportunidad para
                    aprender. Lee libros o sigue blogs sobre jardinería para obtener más información y consejos.
                    </div>
                </div>
                <br />
                <br />
                <br />

                <div className="row">
                    <div className="col" style={{ fontSize: '20px', textAlign: 'justify', fontFamily: 'verdana' }}>
                    Conexión con la naturaleza: Finalmente, disfruta del tiempo que pasas en tu jardín.
                La jardinería no solo embellece tu hogar, sino que también es una excelente manera de reducir el estrés
                y conectarte con la naturaleza. Considera pasar tiempo observando a los insectos y aves que visitan tu jardín,
                y aprecia el ciclo de vida que ocurre en tu pequeño ecosistema.
                    </div>
                    <div className="col">
                        <img src="naturaleza1.png" style={{ width: '25vh', height: '25vh' }} alt="Regadera" />
                    </div>
                </div>

                <br />
                <br />
                <br />



            </div>

            <br />
            <h1>Plantas más comunes</h1>
            <br />

            <div className='row'>
                {plantas.map((planta, index) => (
                    <div className='col-md-4 mb-4' key={index}>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>{planta.nombre}</h5>
                                <p className='card-text'>{planta.descripcion}</p>
                                <h6>Cuidados:</h6>
                                <p className='card-text'>{planta.cuidados}</p>
                                <h6>Consejos:</h6>
                                <p className='card-text'>{planta.tips}</p>
                                <h6>Recomendaciones:</h6>
                                <p className='card-text'>{planta.recomendaciones}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handlereturn}>Regresar</button>
        </div>
    );
};

export default Enciclopedia;*/


import React, { useState, useCallback, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Enciclopedia.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Enciclopedia = () => {
    const navigate = useNavigate();
    const handlereturn = () => { navigate('/Dashboard'); }
    const [plantName, setPlantName] = useState('');
    const [responseText, setResponseText] = useState('Tu respuesta se mostrará aqui');
    const [submittedText, setSubmittedText] = useState('');
    const [loading, setLoading] = useState(false);


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

    }, [navigate]);


    const handleInputChange = (e) => {
        setPlantName(e.target.value);
    };

    const validarCarga = (loading) => {
        if (loading){
            return <><img src = "planta8.gif" alt="CargandoGif" className='Cargando'></img> <p>Cargando...</p></>
        } else {
            return <p className = "responseInfoPlant">{responseText}</p>
        }
    };

    const searchPlant = useCallback(async () => {
        if (!plantName) {
            setResponseText("Por favor, ingresa el nombre de una planta.");
            return;
        }

        setSubmittedText(plantName); // Almacena el texto ingresado
        setPlantName('');
        setLoading(true);
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "Eres un experto en cuidado de plantas." },
                        { role: "user", content: `Busca información como frecuencia de riego, fertilizacion y asoleo sobre la planta: ${plantName}, incluyendo datos importantes extras. Si consideras que no es una planta o flor, o que carece de sentido el texto, colocar 'lo ingresado no es una planta'. Por favor, limita tu respuesta a 250 tokens y asegúrate de que la información sea coherente.` }
                    ],
                    max_tokens: 250
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer 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"
                    }
                }
            );
            setResponseText(response.data.choices[0].message.content);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener la información de la planta:", error);
            setResponseText("No se pudo obtener la recomendación.");
        }
    }, [plantName]);

    const [plantas, setPlantas] = useState([
        {
            nombre: 'Aloe Vera',
            descripcion: 'Planta suculenta conocida por sus propiedades medicinales y su capacidad para almacenar agua.',
            cuidados: 'Riego moderado, luz indirecta, temperatura cálida. Se recomienda no regar en exceso.',
            tips: 'Usar el gel de aloe vera para quemaduras y heridas.',
            recomendaciones: 'Colocarla en un lugar donde reciba luz brillante, pero no luz solar directa.'
        },
        {
            nombre: 'Pothos',
            descripcion: 'Planta de interior fácil de cuidar, ideal para principiantes. Crece bien en diversas condiciones.',
            cuidados: 'Riego semanal, luz indirecta, puede crecer en agua o tierra.',
            tips: 'Corta las hojas amarillas para fomentar un crecimiento saludable.',
            recomendaciones: 'Perfecta para colgar o en estanterías altas.'
        },
        {
            nombre: 'Ficus Elástica',
            descripcion: 'Planta de hojas grandes, excelente para purificar el aire. Se adapta bien a interiores.',
            cuidados: 'Riego moderado, luz brillante, temperatura media. No le gusta el frío.',
            tips: 'Limpia las hojas con un paño húmedo para mantenerlas brillantes.',
            recomendaciones: 'No moverla demasiado, ya que puede perder hojas.'
        },
        {
            nombre: 'Sansevieria',
            descripcion: 'Conocida como lengua de suegra, es una planta resistente y de bajo mantenimiento.',
            cuidados: 'Riego cada 2-3 semanas, luz indirecta. Resistente a condiciones adversas.',
            tips: 'Ideal para principiantes, tolera la falta de luz y agua.',
            recomendaciones: 'Puede crecer en macetas pequeñas debido a su sistema de raíces compacto.'
        },
        {
            nombre: 'Cactus',
            descripcion: 'Planta suculenta que requiere poco riego y puede sobrevivir en climas secos.',
            cuidados: 'Riego cada 2-3 semanas en verano, luz solar directa, requiere buen drenaje.',
            tips: 'Evita el agua en la base de la planta para prevenir la pudrición de raíces.',
            recomendaciones: 'Colocar en un lugar soleado y caliente.'
        },
        {
            nombre: 'Orquídea',
            descripcion: 'Planta exótica que florece de manera espectacular. Requiere cuidados específicos.',
            cuidados: 'Riego semanal, luz indirecta brillante, aireación adecuada.',
            tips: 'Usar fertilizante especial para orquídeas cada dos semanas durante el crecimiento.',
            recomendaciones: 'No dejar agua en el fondo de la maceta.'
        },
        {
            nombre: 'Lavanda',
            descripcion: 'Planta aromática conocida por sus flores moradas y su agradable fragancia.',
            cuidados: 'Riego moderado, luz solar directa, buen drenaje.',
            tips: 'Recortar las flores secas para fomentar un nuevo crecimiento.',
            recomendaciones: 'Colocarla en un lugar soleado, ideal para jardines o balcones.'
        },
        {
            nombre: 'Girasol',
            descripcion: 'Planta anual conocida por sus grandes flores que siguen el sol.',
            cuidados: 'Riego frecuente, luz solar directa, suelo fértil.',
            tips: 'Girar la planta regularmente para asegurar un crecimiento uniforme.',
            recomendaciones: 'Plantar en lugares donde reciba al menos 6 horas de luz solar al día.'
        },
        {
            nombre: 'Rosa',
            descripcion: 'Flor clásica y popular en una amplia variedad de colores. Requiere ciertos cuidados para florecer bien.',
            cuidados: 'Riego regular, luz solar directa, buen drenaje.',
            tips: 'Poda las rosas muertas para estimular nuevas flores.',
            recomendaciones: 'Proteger de plagas como pulgones y usar abono regularmente.'
        },
        {
            nombre: 'Helecho',
            descripcion: 'Planta frondosa ideal para interiores, que prospera en ambientes húmedos.',
            cuidados: 'Riego regular, luz indirecta, ambiente húmedo.',
            tips: 'Rociar con agua para mantener la humedad y evitar que las hojas se sequen.',
            recomendaciones: 'Perfecta para baños o áreas húmedas con luz moderada.'
        },
        {
            nombre: 'Hortensia',
            descripcion: 'Arbusto florido con grandes racimos de flores. El color de las flores varía según el pH del suelo.',
            cuidados: 'Riego abundante, luz indirecta o semisombra, suelos ricos en nutrientes.',
            tips: 'Añadir sulfato de aluminio para hacer que las flores se vuelvan más azules.',
            recomendaciones: 'Evitar la exposición prolongada al sol directo en climas cálidos.'
        },
        {
            nombre: 'Begonia',
            descripcion: 'Planta decorativa conocida por sus flores vibrantes y hojas coloridas.',
            cuidados: 'Riego moderado, luz indirecta, evitar el encharcamiento.',
            tips: 'Retirar las flores marchitas para prolongar la floración.',
            recomendaciones: 'Colocar en macetas colgantes o en estanterías para resaltar sus hojas.'
        },
        {
            nombre: 'Clavel',
            descripcion: 'Flor perenne con pétalos arrugados y colores brillantes, popular en arreglos florales.',
            cuidados: 'Riego moderado, luz solar directa, suelos bien drenados.',
            tips: 'Proporcionar apoyo a los tallos para evitar que se doblen bajo el peso de las flores.',
            recomendaciones: 'Cortar los claveles a ras de suelo para fomentar un crecimiento vigoroso.'
        },
    ]);


    

    return (
        <div className='container-fluid mt-4 text-center'>
            <h1 className="display-4">Mini Enciclopedia de Plantas</h1>
            <p className="lead">¿Deseas buscar alguna planta?</p>


            
            <div className="plantContainer">
                <div className="input-section">
                    <input
                        className="plantName"
                        placeholder="Ingresa el nombre de la planta"
                        value={plantName}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-primary mt-4" onClick={searchPlant}>
                        Buscar
                    </button>
                </div>
                <div className="result-section">
                    <div className="user-text">
                        <p className = "plantText">{submittedText || ""}</p>
                    </div>
                    <div className="response-text">
                        {validarCarga(loading)}
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />


            <h1 className="display-4">Plantas más comunes</h1>
            <br />
            

            <div className="row">
                {plantas.map((planta, index) => (
                    <div className='col-md-4 mb-2' key={index}>
                        <div className='card mb-2 animated-card' style = {{backgroundColor: '#e8fef2'}}>
                            <div className='card-body'>
                                <h5 className='card-title'>{planta.nombre}</h5>
                                <p className='card-text'>{planta.descripcion}</p>
                                <h6>Cuidados:</h6>
                                <p className='card-text'>{planta.cuidados}</p>
                                <h6>Consejos:</h6>
                                <p className='card-text'>{planta.tips}</p>
                                <h6>Recomendaciones:</h6>
                                <p className='card-text'>{planta.recomendaciones}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>  

            <button className="btn btn-primary mt-4" onClick={handlereturn}>Regresar</button>
        </div>
    );
};

export default Enciclopedia;

