const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const secrets = require('../secret/secrets');

const Auth = require('./authModel');

router.get("/", (req, res) => {
  res.status(200).json({ api: "working", dbenv: process.env.DB_ENV });
});

router.post('/register', (req, res) => {
  let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;

    Auth.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findBy({ username })
.first()
.then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {

    const token = signToken(user);
    const tokenData = jwt.verify(token, secrets.jwtSecret)
    console.log(tokenData)
    res.status(200).json({
        token: token,
        message: `Welcome ${user.username}!`,
    });
    } else {
    res.status(401).json({ message: 'Invalid Credentials' });
    }
  })
    .catch(error => {
    res.status(500).json(error);
  });
});


function signToken(user) {
  const payload = {
  id: user.id,
  username: user.username,
  password: user.password
  };

  const secret = process.env.JWT_SECRET || 'secret';

  const options = {
  expiresIn: '1min',
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;