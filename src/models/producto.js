const mongoose = require('mongoose');


const productoSchema = mongoose.Schema({
    producto: {
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
    cantidadEnStock: {
        type: Number,
        required: true,
        default: 1  
    }
});

module.exports = mongoose.model('Producto', productoSchema);
