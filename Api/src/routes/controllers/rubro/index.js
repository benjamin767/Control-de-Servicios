const { Rubro } = require("../../../db");

module.exports = {
    createRubro: async (nombre) => {
        return await Rubro.create({ nombre });
    },
    eliminarRubro: async (nombre) => {
        await Rubro.destroy({ 
            where: { nombre } 
        });
        return "Rubro eliminado.";
    },
    obtenerRubros: async () => {
        return await Rubro.findAll();
    }
}