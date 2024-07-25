const express = require("express" );

const router = express.Router();

// creando usuario 

router.post("/user", (req, res) => {
    res.send("Creando usuario");
});

module.exports = router;

