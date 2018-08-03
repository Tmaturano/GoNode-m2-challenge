const validator = require('validator');
const { Section, Project } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const { sectionId, id } = req.params;

      const project = await Project.findOne({
        include: [Section],
        where: {
          id,
        },
      });

      const selectedSection = await Section.findById(sectionId);

      return res.render('projects/show', {
        project,
        selectedSection,
        activeSection: sectionId,
      });
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const { title, content } = req.body;

      if (title === undefined || validator.isEmpty(title)) {
        req.flash('error', 'É necessário informar o nome da nova seção');
        return res.redirect(`/app/projects/${req.params.id}/show/section/${req.params.sectionId}`);
      }

      if (content === undefined || validator.isEmpty(content)) {
        req.flash('error', 'É necessário informar o conteúdo da nova seção');
        return res.redirect(`/app/projects/${req.params.id}/show/section/${req.params.sectionId}`);
      }

      const section = await Section.create({
        ...req.body,
        ProjectId: req.params.id,
      });

      req.flash('success', `A seção ${title} foi criada com sucesso`);
      return res.redirect(`/app/projects/${req.params.id}/show/section/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const section = await Section.findById(req.params.sectionId);
      await section.update(req.body);

      req.flash('success', 'Seção atualizada com sucesso');
      return res.redirect(`/app/projects/${req.params.id}/show/section/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },
};
