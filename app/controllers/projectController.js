const validator = require('validator');
const { Project } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { title } = req.body.title;

      if (title === undefined || validator.isEmpty(title)) {
        req.flash('error', 'É necessário informar o nome do novo projeto');
        return res.redirect('/');
      }

      await Project.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', `O projeto ${title} foi criado com sucesso`);
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
};
