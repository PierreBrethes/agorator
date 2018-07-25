const User = require('../models/User');
const uuid = require('uuid/v1');

async function login(req, res) {
  const _token = await uuid()
  const user = await User.findOne({where: {mail: req.body.mail, password: req.body.password}})
  try {
    user.token = _token
    user.save()
    res.json(user)
  } catch (e) {
    res.write("No data")
  }
}
async function auth(req, res) {
  const user = await User.findOne({where: {mail: req.body.mail, token: req.body.token}})
  if(user) {
    res.json({status: 200, message:"Valide Token"})
  } else {
    res.json({status: 401, message:"No token valid"})
  }
}

module.exports = {
  login,
  auth
 }
