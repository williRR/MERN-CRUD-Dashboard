const express = require('express');
const mongoose = require('mongoose'); // Importa el paquete de mongoose
require('dotenv').config(); // Para leer las variables de entorno

const userRoutes = require('./routes/user'); // Asegúrate de que esta ruta exista y sea correcta

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use('/api', userRoutes);

// Rutas
app.get("/", (req, res) => {
    res.send("Hello World holaa");
});

// Conectar a MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error conectando a MongoDB:', err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
