const express = require('express');
const bcrypt = require('bcryptjs');
const { findUserByUsername } = require('../services/db');

const router = express.Router();

router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }

  return res.render('pages/login', {
    title: 'Inicio de sesión',
    error: null
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).render('pages/login', {
      title: 'Inicio de sesión',
      error: 'Usuario o contraseña inválidos.'
    });
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  return res.redirect('/dashboard');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
