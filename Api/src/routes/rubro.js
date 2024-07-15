const express = require("express");
const router = express.Router();
const { createRubro, obtenerRubros, eliminarRubro } = require("./controllers/rubro");

router.post("/", async (req, res) => {
    const { nombre } = req.body;
    try {
        const rubro = await createRubro(nombre);
        res.status(201).json(rubro);
    }catch(error) {
        res.status(404).json({ msg: error.message })
    }
});

router.get("/", async (req, res) => {
    try {
        const rubros = await obtenerRubros();
        res.status(200).json(rubros);
    }catch(error) {
        res.status(400).json({ msg: error.message })
    }
});

router.delete("/:nombre", async (req, res) => {
    const { nombre } = req.params;
    try {
        res.status(200).json({ msg: eliminarRubro(nombre) });
    }catch(error) {
        res.status(400).send({ msg: error.message })
    }
});

module.exports = router;