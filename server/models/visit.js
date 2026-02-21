const {DataTypes} = require('sequelize');
const {sequelize} = require('../connect');

const Visit = sequelize.define('Visit', {
    timeStamp: {
        type: DataTypes.BIGINT,
        allowNull: false    
    },
    urlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Urls',
            key: 'id'
        }
    }
}, {timestamps: true});

module.exports = Visit;