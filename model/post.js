const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: {
            model: 'category',
            key: 'id'
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'user',
            key: 'id'
        }
    },
    visitCount: {
        type: Sequelize.INTEGER,
        field: 'visit_count',
        defaultValue: 0
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

module.exports = Post;