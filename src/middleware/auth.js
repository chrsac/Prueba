const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).render('pages/error', {
      title: 'Acceso denegado',
      message: 'Solo los administradores pueden acceder a esta sección.'
    });
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin
};
