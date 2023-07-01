const User = require('../models/User');
const bcrypt = require('bcrypt');

const auth = require('../auth');

const { createAccessToken } = auth;

module.exports.registerUser = (req, res) => {
  console.log(req.body);
  if(req.body.password.length < 8) return res.send({message: "Password is too short."})

  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    password: req.body.password
  })
  newUser.save()
  .then(user => res.send(user))
  .catch(err => res.send(err))
}

module.exports.loginUser = (req, res) => {
  User.findOne({username: req.body.username}).then(result => {
    if(result === null) {
      return res.send ({message: "No user found."})
    }
    else {
      console.log(req.body.username);
      console.log(req.body.password);

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
      console.log(isPasswordCorrect);

      if(isPasswordCorrect) {
        return res.send ({accessToken: createAccessToken(result)})
      }
      else {
        return res.send ({message: "Password is incorrect."})
      }
    }
  })
  .catch(err => res.send(err))
}