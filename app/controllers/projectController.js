const validator = require('validator');
const { Project, Section } = require('../models');

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

  async show(req, res, next) {
    try {
      const project = await Project.findOne({
        include: [Section],
        where: {
          id: req.params.id,
        },
      });

      return res.render('projects/show', {
        project,
        activeSection: 1,
      });
    } catch (err) {
      return next(err);
    }
  },
};
