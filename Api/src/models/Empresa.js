const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('empresa', {
        nombre: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: {    
                args: true,    
                msg: 'Esta empresa ya esta creada queridito',
            },
        }
    }, {
        timestamps: false,
    });
};