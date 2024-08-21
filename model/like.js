const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Like = sequelize.define('like', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    postId: {
        type: Sequelize.INTEGER,
        field: 'post_id',
        references: {
            model: 'post',
            key: 'id'
        }
    },
    commentId: {
        type: Sequelize.INTEGER,
        field: 'parent_id',
        references: {
            model: 'comment',
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
    createDate: {
        type: Sequelize.DATE,
        field: 'create_date',
        defaultValue: Sequelize.DataTypes.NOW,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Like;