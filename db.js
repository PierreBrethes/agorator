const Sequelize = require('sequelize');
const sequelize = new Sequelize('agorator', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

module.exports = sequelize
