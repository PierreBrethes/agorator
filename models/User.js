const Sequelize = require('sequelize');
const sequelize = new Sequelize('agorator', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

const User = sequelize.define('user', {
  mail: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  lastname: {
    type: Sequelize.STRING
  },
  firstname: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
})

module.exports = User
