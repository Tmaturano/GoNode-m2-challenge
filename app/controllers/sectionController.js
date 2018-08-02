const { Section } = require('../models');

module.exports = {
  async show(req, res, next) {
    try {
      const project = await Section.findOne({
        include: [Section],
        where: {
          id: req.params.id,
        },
      });

      return res.render('projects/show', {
        project,
        activeSection: req.params.sectionId,
      });
    } catch (err) {
      return next(err);
    }
  },
};
