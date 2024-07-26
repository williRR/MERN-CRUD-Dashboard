const express = require("express" );
// modelo de datos de usuario 
const userSchema= require("../models/user");
const router = express.Router();

// creando usuario , end point 
router.post("/user", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});




// mostar todos los usuarios

router.get("/user", (req, res) => {
    userSchema
        .find()
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});

// mostrar un usuario en especifico


router.get("/user/:id", (req, res) => {
    const{id}= req.params
    userSchema
        .findById(id)
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});


// actualizar un usuario en especifico
router.put("/user/:id", (req, res) => {
    const{id}= req.params;
    const{name,age,email}= req.body;
    userSchema
        .updateOne({_id:id},{  $set: {name,age,email}})
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});



// eliminar un usuario en especifico

router.delete("/user/:id", (req, res) => {
    const{id}= req.params;
    userSchema
        .deleteOne({_id:id})        
        .then((data)=> res.json(data))
        .catch((error) => res.json({message: error}));
});



module.exports = router;