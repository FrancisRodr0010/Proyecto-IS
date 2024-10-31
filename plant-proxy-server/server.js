const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Elige el puerto que desees

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json()); // Para analizar el cuerpo de las solicitudes JSON

// Ruta para obtener las plantas desde la API de Trefle
app.get('/api/plants', async (req, res) => {
    try {
        const response = await axios.get(`https://trefle.io/api/v1/plants?token=YiyLJVNzNktlZ7jF-M1iBVmotY2SWdi-orcNSEomy3E`);
        res.json(response.data); // Devuelve la respuesta de la API
    } catch (error) {
        console.error('Error al obtener plantas:', error);
        res.status(500).json({ error: 'Error al obtener plantas' });
    }
});

app.post('/api/guardar-planta', async (req, res) => {
    const { nombre_comun, nombre_cientifico, description, fecha_creacion } = req.body;

    // Aquí deberías tener tu lógica para guardar la planta en la base de datos
    try {
        // Supón que tienes una función llamada guardarPlanta que se encarga de esto
        await guardarPlanta({ nombre_comun, nombre_cientifico, description, fecha_creacion });
        res.status(201).json({ message: 'Planta guardada correctamente' });
    } catch (error) {
        console.error('Error al guardar la planta:', error);
        res.status(500).json({ error: 'Error al guardar la planta' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
