const User = require('../models/User');

// GET
async function getAllUsers(req, res) {
  const users = await User.findAll().then(users => {
    return users
  })
  res.json(users)
}
async function getUser(req, res) {
  const mail = await User.findOne({where: {mail: req.params.data}})
  const username = await User.findOne({where: {username: req.params.data}})
  try {
    if (mail == null) {
      res.json(username)
    } else {
      res.json(mail)
    }
  } catch (e) {
    res.error(e)
  }
}

// POST
function createUser(req, res) {
  User
  .findOrCreate({where: {
    username: req.body.username,
    password: req.body.password,
    mail: req.body.mail,
    lastname: req.body.lastname,
    firstname: req.body.firstname
  }})
  .spread((user, created) => {
    res.json(user)
  })
}

// DELETE
function deleteUser(req, res) {
  User.findOne({where: {mail: req.params.mail}})
    .then(user => {
      user.destroy();
      res.json({message: "user deleted", user})
    })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser
 }
