const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('service', {

    }, {
        timestamps: false,
    });
};