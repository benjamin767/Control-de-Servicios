const express = require("express");
const router = express.Router();
const { createService, getServices } = require("./controllers/service");

router.post("/", async (req, res) => {
    const { 
        rubro, 
        empresa, 
        descripcion, 
        periodo, 
        metodo_de_pago, 
        medio_de_pago,
        vencimiento,
        moneda,
        importe
    } = req.body;

    try {
        const service = await createService(rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe);
        res.status(201).json(service);
    } catch(error) {
        res.status(404).json({ msg: error.message });
    }
});

router.get("/", async (req, res) => {
    const { vencimiento, rubro, empresa, } = req.body;
    try {
        const services = await getServices(vencimiento, rubro, empresa);
        res.status(200).json({ services })
    } catch(error) {
        res.status(404).json({ msg: error.message });
    }
});

module.exports = router;