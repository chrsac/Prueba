const express = require('express');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { listUsers, createUser } = require('../services/db');

const router = express.Router();

router.get('/', (_req, res) => res.redirect('/dashboard'));

router.get('/dashboard', requireAuth, (req, res) => {
  res.render('pages/dashboard', {
    title: 'Inicio',
    activeMenu: 'inicio',
    user: req.session.user
  });
});

router.get('/usuarios', requireAuth, requireAdmin, (req, res) => {
  res.render('pages/users', {
    title: 'Usuarios',
    activeMenu: 'usuarios',
    user: req.session.user,
    users: listUsers(),
    error: null,
    success: null
  });
});

router.post('/usuarios', requireAuth, requireAdmin, (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).render('pages/users', {
      title: 'Usuarios',
      activeMenu: 'usuarios',
      user: req.session.user,
      users: listUsers(),
      error: 'Todos los campos son obligatorios.',
      success: null
    });
  }

  try {
    createUser({ username, password, role });
    return res.render('pages/users', {
      title: 'Usuarios',
      activeMenu: 'usuarios',
      user: req.session.user,
      users: listUsers(),
      error: null,
      success: 'Usuario creado exitosamente.'
    });
  } catch (_error) {
    return res.status(400).render('pages/users', {
      title: 'Usuarios',
      activeMenu: 'usuarios',
      user: req.session.user,
      users: listUsers(),
      error: 'No se pudo crear el usuario. Verifica que el nombre no exista.',
      success: null
    });
  }
});

module.exports = router;
