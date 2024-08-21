const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const File = sequelize.define('file', {
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
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'post_id',
        references: {
            model: 'post',
            key: 'id'
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = File;