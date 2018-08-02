const { Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', `O projeto ${req.body.title} foi criado com sucesso`);
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
};
