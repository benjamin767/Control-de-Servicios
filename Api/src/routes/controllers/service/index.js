const { Service, Rubro, Empresa } = require("../../../db");
const { Op, EmptyResultError } = require("sequelize");
const { parseISO, isValid, format } = require('date-fns');
const { scheduleEmail, sendMail } = require("../../../nodemail");
const axios = require("axios");

module.exports = {
    createService: async (serial_number, rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe, estado ) => {
        vencimiento = vencimiento.split("-").map(e => Number(e));
        const date = new Date(vencimiento[0], vencimiento[1]-1, vencimiento[2], 9, 30, 0);
        
        //if( !isValid(date) ) throw new Error("La fecha es incorrecta");
        console.log(date);
        const service = await Service.create({
            serial_number, 
            descripcion, 
            periodo, 
            metodo_de_pago, 
            medio_de_pago, 
            vencimiento: date, 
            moneda, 
            importe,
            estado
        });
        
        scheduleEmail(date.setDate(date.getDate() - 1), "it@frecom.com.ar", rubro, empresa, descripcion, vencimiento, importe, moneda );
        ///await sendMail("it@frecom.com.ar");
        // const foundRubro = await Rubro.findOrCreate({
        //     where : { nombre: rubro }
        // });
        // const foundEmpresa = await Empresa.findOrCreate(empresa)
        await service.setRubro(rubro);
        await service.setEmpresa(empresa);
        const calendar = await axios.get(`http://localhost:5899/google/schedule_event?fecha=${date}&empresa=${empresa}&rubro=${rubro}&descripcion=${descripcion}`)
            .then(res => res.data);
        return { 
            service,
            msg: calendar.msg
        };
    },
    getServices: async (vencimiento) => {
        if(!vencimiento) return await Service.findAll();
        const date = parseISO(vencimiento);
        return await Service.findAll({
            where: {
                vencimiento
            },
            include: [
                {
                    model: Rubro,
                    as: "rubro",
                    attributes:["nombre"],
                    required: false
                },
                {
                    model: Empresa,
                    as: "empresa",
                    attributes:["nombre"],
                    required: false
                }
            ]
        });
    },
    setServices: async ( id, rubro, empresa, descripcion, periodo, metodo_de_pago, medio_de_pago, vencimiento, moneda, importe, estado ) => {
        if( !id ) throw new Error("Faltan datos importantes de referencia para buscar la factura");
        
        const msg = await Service.update({
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
        },{
            where: { id }
        });
        if(msg[0] == 1) return "Factura Actualizada";

        throw new Error("No se pudo actualizar los datos de la factura");
    },
};