const express = require("express");
const router = express.Router();
const { createService, getServices, setServices } = require("./controllers/service");

router.post("/", async (req, res) => {
    const { 
        serial_number,
        rubro, 
        empresa, 
        descripcion, 
        periodo, 
        metodo_de_pago, 
        medio_de_pago,
        vencimiento,
        moneda,
        importe,
        estado
    } = req.body;

    try {
        const service = await createService(serial_number, rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe, estado);
        res.status(201).json(service);
    } catch(error) {
        console.log(error);
        res.status(404).json({ msg: error.message });
    }
});

router.get("/", async (req, res) => {
    const { vencimiento, rubro, empresa } = req.query;
    console.log(vencimiento)
    try {
        const services = await getServices(vencimiento, rubro, empresa);
        res.status(200).json({ services })
    } catch(error) {
        console.log(error)
        res.status(404).json({ msg: error.message });
    }
});

router.get("/:inicio/:final", async (req, res) => {
    const { inicio, final } = req.body;

    try {

    }catch(error) {

    }
});

router.put("/", async (req,res) => {
    const { 
        id,
        rubro, 
        empresa, 
        descripcion, 
        periodo, 
        metodo_de_pago, 
        medio_de_pago, 
        vencimiento, 
        moneda, 
        importe, 
        estado 
    }= req.body;
    try {
        const service = await setServices(id, rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe, estado);
        res.status(200).json({ service });
    } catch(error) {
        res.status(404).json({ msg: error.message });
    }
}); 

module.exports = router;