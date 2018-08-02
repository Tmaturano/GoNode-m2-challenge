const { Section, Project } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const { sectionId, id } = req.params;

      // const section = await Section.findById(sectionId);

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
};
