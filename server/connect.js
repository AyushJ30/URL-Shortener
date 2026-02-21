require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

 
async function connectedToMySQl(){
    try{
        await sequelize.authenticate();
        console.log('MySQL Connected');
    } catch(err){
        console.error('Connection failed:', err);
    }
}

module.exports = {
    sequelize,
    connectedToMySQl
}