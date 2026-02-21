const {DataTypes} = require('sequelize');
const {sequelize} = require('../connect');

const Url = sequelize.define('URL', {
    shortId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    redirectId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {timestamps: true});

module.exports = Url;