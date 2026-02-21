const User = require('./user');
const Url = require('./url');
const Visit = require('./visit');

const {sequelize} = require('../connect');

User.hasMany(Url, {foreignKey: 'createdBy'});
Url.belongsTo(User, {foreignKey: 'createdBy'});

Url.hasMany(Visit, {foreignKey: 'urlId', onDelete: 'CASCADE', as: 'visitHistory'});
Visit.belongsTo(Url, {foreignKey: 'urlId'});


module.exports ={
    User,
    Url,
    Visit,
    sequelize
}