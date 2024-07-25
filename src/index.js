const express = require('express');
const mongose = require('mongoose');
require("dotenv").config(); // para leer las variables de entorno
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 9000;


// Rutas
app.get("/", (req, res) => {
    res.send("Hello World holaa "); 
});

//middleware

app.use('/api', userRoutes);


// Conectar a MongoDB
mongose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('ERROR',err));


app.listen(port, () => console.log(`Server is running on port ${port}`));
