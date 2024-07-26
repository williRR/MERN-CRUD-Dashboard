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

module.exports = router;

