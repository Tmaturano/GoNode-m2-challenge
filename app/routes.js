const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

// Flash Middleware
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});


/**
 * Auth
 */
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

/**
 * Dashboard
 */
routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

/**
 * Projects
 */
routes.post('/app/projects/create', projectController.store);
routes.get('/app/projects/:id/show', projectController.show);
routes.delete('/app/projects/:id', projectController.remove);

/**
 * Sections
 */
routes.get('/app/projects/:id/show/section/:sectionId', sectionController.show);
routes.post('/app/projects/:id/section/create', sectionController.store);
routes.put('/app/projects/:id/section/:sectionId', sectionController.update);
routes.delete('/app/projects/:id/section/:sectionId', sectionController.remove);

routes.use((req, res) => res.render('errors/404'));

// Error Middleware
routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
