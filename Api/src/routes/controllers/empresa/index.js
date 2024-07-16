const { Empresa } = require("../../../db");

module.exports = {
    createEmpresa: async (nombre) => {
        return await Empresa.create({ nombre });
    }
}