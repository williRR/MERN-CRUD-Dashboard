const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el paquete cors
require('dotenv').config();

const userRoutes = require('./routes/producto'); 
const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(cors()); // Usa el paquete cors
app.use(express.json());
app.use('/api', userRoutes);

// Rutas
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Conectar a MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error conectando a MongoDB:', err));

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
