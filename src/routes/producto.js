const express = require("express");
const productoSchema = require("../models/producto");
const router = express.Router();

// Crear producto
router.post("/", (req, res) => {
    const producto = productoSchema(req.body);
    producto
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Mostrar todos los productos
router.get("/", (req, res) => {
    productoSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Mostrar un producto específico
router.get("/:id", (req, res) => {
    const { id } = req.params;
    productoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Actualizar un producto específico
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { producto, descripcion, precio, cantidadEnStock } = req.body;
    productoSchema
        .updateOne({ _id: id }, { $set: { producto, descripcion, precio, cantidadEnStock } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Eliminar un producto específico
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    productoSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
