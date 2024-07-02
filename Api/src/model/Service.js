const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('user', {

    }, {
        timestamps: false,
    });
};