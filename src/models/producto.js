const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    cantidadEnStock: {
        type: Number,
        required: true,
        default: 1  
    }
});

module.exports = mongoose.model('Producto', productoSchema);
