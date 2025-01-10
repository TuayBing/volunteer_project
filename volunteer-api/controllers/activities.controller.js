const ActivityRegistration = require('../models/activity_registration.model');
const Activity = require('../models/activity.model');

const activitiesController = {
  // ดึงกิจกรรมที่มีให้เลือก
  getActivities: async (req, res) => {
    try {
      const activities = await Activity.findAll({
        attributes: ['id', 'name', 'description', 'image_url', 'hours', 'location']
      });
      res.json(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ 
        success: false,
        message: 'ไม่สามารถดึงข้อมูลกิจกรรมได้',
        error: error.message 
      });
    }
  },

  // บันทึกการลงทะเบียนกิจกรรม
  registerActivities: async (req, res) => {
    try {
      const { activities, userid } = req.body;

      // ใช้ bulkCreate เพื่อบันทึกหลายรายการ
      const registrations = await ActivityRegistration.bulkCreate(
        activities.map(activity => ({
          user_id: userid,
          name: activity.name,
          description: activity.description,
          hours: activity.hours,
          image_url: activity.image_url,
          location: activity.location,
          status: 'กำลังดำเนินการ',
          registered_at: new Date()
        }))
      );

      res.json({
        success: true,
        message: 'บันทึกกิจกรรมสำเร็จ',
        result: registrations
      });

    } catch (error) {
      console.error('Error registering activities:', error);
      res.status(500).json({
        success: false,
        message: 'ไม่สามารถบันทึกกิจกรรมได้',
        error: error.message
      });
    }
  },

  // ดึงกิจกรรมที่ user ลงทะเบียน
  getUserActivities: async (req, res) => {
    try {
      const { userId } = req.params;

      const activities = await ActivityRegistration.findAll({
        where: { user_id: userId },
        order: [['registered_at', 'DESC']]
      });

      res.json(activities);

    } catch (error) {
      console.error('Error fetching user activities:', error);
      res.status(500).json({
        success: false,
        message: 'ไม่สามารถดึงข้อมูลกิจกรรมได้',
        error: error.message
      });
    }
  },

  // อัพเดทสถานะกิจกรรม
  updateActivityStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // ตรวจสอบว่า status ที่ส่งมาถูกต้อง
      const validStatuses = ['สำเร็จ', 'กำลังดำเนินการ', 'ยกเลิก'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'สถานะไม่ถูกต้อง'
        });
      }
  
      const activity = await ActivityRegistration.findByPk(id);
      if (!activity) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบกิจกรรมนี้'
        });
      }
  
      activity.status = status;
      await activity.save();
  
      res.json({
        success: true,
        message: 'อัพเดทสถานะสำเร็จ',
        activity
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        message: 'ไม่สามารถอัพเดทสถานะได้'
      }); 
    }
  },

  //ลบกิจกรรม
  deleteActivity: async (req, res) => {
    try {
      const { id } = req.params;
      
      const activity = await ActivityRegistration.findByPk(id);
      if (!activity) {
        return res.status(404).json({
          success: false,
          message: 'ไม่พบกิจกรรมนี้'
        });
      }
  
      await activity.destroy();
  
      res.json({
        success: true,
        message: 'ลบกิจกรรมสำเร็จ'
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        message: 'ไม่สามารถลบกิจกรรมได้'
      });
    }
  }
};

module.exports = activitiesController;