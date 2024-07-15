const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('rubro', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {    
                args: true,    
                msg: 'Este rubro ya esta creado',
            },
        }
    }, {
        timestamps: false,
    });
};