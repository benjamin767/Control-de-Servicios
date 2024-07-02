const { Service } = require("../../../db");
const { Op } = require("sequelize");
const { parseISO, isValid, format } = require('date-fns');

module.exports = {
    createService: async ( rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe ) => {
        const date = parseISO(vencimiento);
        //if( !isValid(date) ) throw new Error("La fecha es incorrecta");
        return await Service.create({
            rubro, 
            empresa, 
            descripcion, 
            periodo, 
            metodo_de_pago, 
            medio_de_pago,
            vencimiento,
            moneda,
            importe
        });
    },
    getServices: async (vencimiento, rubro, empresa) => {
        if(!vencimiento && !rubro && !empresa) return await Service.findAll();
        const date = parseISO(vencimiento);
        return await Service.findAll({
            where: {
                [Op.or]: [{ vencimiento }, { rubro }, { empresa }] 
            }
        });
    },
    setServices: async ( id, rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe, estado ) => {
        if( !id ) throw new Error("Es necesario pasar el id de la factura para buscarlo");
        
        return await Service;
    },
};