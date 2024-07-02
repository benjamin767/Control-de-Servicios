const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('service', {
        rubro: {
            type: DataTypes.STRING,
        },
        empresa: {
            type: DataTypes.STRING,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        periodo: {
            type: DataTypes.STRING,
            defaultValue: 'Mensual',
            validate: {
                isIn: [['Mensual', 'Anual']],
            }
        },
        metodo_de_pago: {
            type: DataTypes.STRING,
            defaultValue: 'Manual',
            validate: {
                isIn: [['Manual', 'Automatico']],
            }
        },
        medio_de_pago: {
            type: DataTypes.STRING,
            defaultValue: 'Transferencia',
            validate: {
                isIn: [['Debito Automatico en Cuenta', 'Debito Automatico en Tarjeta', 'Transferencia', 'Tarjeta de Credito']],
            }
        },
        vencimiento: {
            type: DataTypes.DATEONLY,
        },
        moneda: {
            type: DataTypes.STRING,
            defaultValue: 'Pesos',
            validate: {
                isIn: [['Pesos', 'Dolares', 'Euros']],
            }
        },
        importe: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.STRING,
            defaultValue: 'Pendiente',
            validate: {
                isIn: [['Pendiente', 'Pagado']],
            }
        },
    }, {
        timestamps: false,
    });
};