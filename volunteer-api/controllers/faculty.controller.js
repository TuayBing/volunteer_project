const Faculty = require('../models/faculty.model');
const Major = require('../models/major.model');

// Get all faculties
exports.getAllFaculties = async (req, res) => {
 try {
   const faculties = await Faculty.findAll({
     order: [['name', 'ASC']]
   });
   
   res.json({
     success: true,
     faculties
   });
 } catch (error) {
   console.error('Error fetching faculties:', error);
   res.status(500).json({
     success: false, 
     message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
   });
 }
};

// Get majors by faculty
exports.getMajorsByFaculty = async (req, res) => {
 try {
   const { facultyId } = req.params;
   
   const majors = await Major.findAll({
     where: { facultyId },
     order: [['name', 'ASC']]
   });
   
   res.json({
     success: true,
     majors
   });
 } catch (error) {
   console.error('Get majors error:', error);
   res.status(500).json({
     success: false,
     message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
   });
 }
};