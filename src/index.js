const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // para leer las variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Crear una instancia de mongoDbclient     
let client;

async function connectToMongoDB() {
    try {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('ERROR AL CONECTAR', error);
    }
}

// Conectar a MongoDB
connectToMongoDB();

// Rutas
app.get('/', (req, res) => {
    res.send('Hello World hola ');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
