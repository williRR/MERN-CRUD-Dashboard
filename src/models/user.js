// esquema para un usuario 
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

// exportar el modelo
module.exports = mongoose.model('User', userSchema);