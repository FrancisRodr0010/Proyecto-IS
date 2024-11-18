const express = require('express');
const AWS = require('aws-sdk');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Elige el puerto que desees

const upload = multer();

// Configura AWS con tus credenciales
AWS.config.update({
    accessKeyId: 'AKIAUMYCIMNLB2ZSZIHK',
    secretAccessKey: '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',
    region: 'us-west-1', // Por ejemplo: 'us-east-1'
});

const sns = new AWS.SNS();

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(bodyParser.json()); // Para analizar el cuerpo de las solicitudes JSON

const rekognition = new AWS.Rekognition({
    region: 'us-east-1', // Asegúrate de que la región coincida
    accessKeyId: 'AKIAUMYCIMNLISDSDE6U',       // Coloca aquí la Access Key ID
    secretAccessKey: 's0/zb4smgHSuPNzY2Dc8Hcvi0BQUqnfGf1NqX8Yt' // Coloca aquí el Secret Access Key
});


// Ruta para analizar la imagen
app.post('/analyze-image', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
    }

    const params = {
        Image: {
            Bytes: req.file.buffer,
        },
        MaxLabels: 10,
        MinConfidence: 75
    };

    try {
        const result = await rekognition.detectLabels(params).promise();
        res.json(result.Labels);
    } catch (error) {
        console.error('Error al analizar la imagen:', error);
        res.status(500).json({ error: 'Error al analizar la imagen' });
    }
});

// Ruta para enviar una notificación a SNS
app.post('/send-notification', async (req, res) => {
    const { message, topicArn } = req.body;

    const params = {
        Message: message,
        TopicArn: topicArn,
    };

    try {
        const data = await sns.publish(params).promise();
        res.json({ message: 'Notificación enviada', messageId: data.MessageId });
    } catch (error) {
        console.error('Error enviando la notificación:', error);
        res.status(500).json({ error: 'Error al enviar la notificación' });
    }
});

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
    console.log(`Servidor escuchando en http://13.57.192.47:${PORT}`);
});
