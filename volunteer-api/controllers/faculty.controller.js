const Faculty = require('../models/faculty.model');
const Major = require('../models/major.model');

const facultyController = {
  getAllFaculties: async (req, res) => {
    try {
      const faculties = await Faculty.findAll({
        attributes: ['id', 'name'],
        raw: true,
        order: [['name', 'ASC']]
      });

      res.json(faculties);
    } catch (error) {
      console.error('Error in getAllFaculties:', error);
      res.status(500).json({ 
        success: false, 
        message: 'ไม่สามารถดึงข้อมูลคณะได้'
      });
    }
  },

  getMajorsByFaculty: async (req, res) => {
    try {
      const { facultyId } = req.params;
      const majors = await Major.findAll({
        where: { facultyId },
        attributes: ['id', 'name'],
        raw: true,
        order: [['name', 'ASC']]
      });

      res.json(majors);
    } catch (error) {
      console.error('Error in getMajorsByFaculty:', error);
      res.status(500).json({ 
        success: false, 
        message: 'ไม่สามารถดึงข้อมูลสาขาได้'
      });
    }
  }
};

module.exports = facultyController;