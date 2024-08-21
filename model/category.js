const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createDate: {
        type: Sequelize.DATE,
        field: 'create_date',
        defaultValue: Sequelize.DataTypes.NOW,
    },
    updateDate: {
        type: Sequelize.DATE,
        field: 'update_date',
        defaultValue: Sequelize.DataTypes.NOW,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Category;