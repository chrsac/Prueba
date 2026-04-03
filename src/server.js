const path = require('path');
const express = require('express');
const session = require('express-session');
const menuItems = require('./config/menu');
const { init } = require('./services/db');

const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app');

const app = express();
const PORT = process.env.PORT || 3000;

init();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'cambia-esta-clave-en-produccion',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 8
  }
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  res.locals.menuItems = menuItems;
  next();
});

app.use(authRoutes);
app.use(appRoutes);

app.use((req, res) => {
  res.status(404).render('pages/error', {
    title: 'No encontrado',
    message: 'La página solicitada no existe.'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
