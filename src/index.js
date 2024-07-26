const express = require('express');
const mongoose = require('mongoose'); // Importa el paquete de mongoose
require('dotenv').config(); // Para leer las variables de entorno

const userRoutes = require('./routes/producto'); 
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use('/api', userRoutes);

// Rutas
app.get("/", (req, res) => {
    res.send("Hello World ");
});

// Conectar a MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error conectando a MongoDB:', err));

app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`));
