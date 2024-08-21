const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
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
    },
    profile_image: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = User;