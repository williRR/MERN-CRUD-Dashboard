const express = require("express");
const productoSchema = require("../models/producto");
const router = express.Router();

// Crear producto
router.post("/producto", (req, res) => {
    const producto = productoSchema(req.body);
    producto
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Mostrar todos los productos
router.get("/producto", (req, res) => {
    productoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Mostrar un producto específico
router.get("/producto/:id", (req, res) => {
    const { id } = req.params;
    productoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Actualizar un producto específico
router.put("/producto/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, cantidadEnStock } = req.body;
    productoSchema
        .updateOne({ _id: id }, { $set: { nombre, descripcion, precio, categoria, cantidadEnStock } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Eliminar un producto específico
router.delete("/producto/:id", (req, res) => {
    const { id } = req.params;
    productoSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
