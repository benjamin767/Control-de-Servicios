const express = require("express");
const router = express.Router();
const { createEmpresa, getEmpresas } = require("./controllers/empresa");

router.post("/", async (req, res) => {
    const { nombre } = req.body;
    try {
        res.status(201).json( await createEmpresa(nombre));
    }catch(error) {
        res.status(400).send({
            msg: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        res.status(200).json( await getEmpresas());
    }catch(error) {
        res.status(400).send({
            msg: error.message
        });
    }
});

module.exports = router;