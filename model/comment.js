const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT,
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
    parentId: {
        type: Sequelize.INTEGER,
        field: 'parent_id',
        references: {
            model: 'comment',
            key: 'id'
        },
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

module.exports = Comment;