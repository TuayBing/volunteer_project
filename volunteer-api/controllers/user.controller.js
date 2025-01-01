const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user.model');

// Register
exports.register = async (req, res) => {
 try {
   const { username, email, password, firstName, lastName, phoneNumber } = req.body;

   // Validate required fields
   if (!username || !email || !password || !firstName || !lastName) {
     return res.status(400).json({
       success: false,
       message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'
     });
   }

   // Password validation
   if (password.length < 8) {
     return res.status(400).json({
       success: false,
       message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'
     });
   }

   if (!/[a-zA-Z]/.test(password)) {
     return res.status(400).json({
       success: false,
       message: 'รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว'
     });
   }

   // Email validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     return res.status(400).json({
       success: false,
       message: 'รูปแบบอีเมลไม่ถูกต้อง'
     });
   }

   // Check existing user
   const existingUser = await User.findOne({
     where: {
       [Op.or]: [
         { username },
         { email }
       ]
     }
   });

   if (existingUser) {
     return res.status(400).json({
       success: false,
       message: 'ชื่อผู้ใช้หรืออีเมลนี้มีในระบบแล้ว'
     });
   }

   // Validate phone number if provided
   if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) {
     return res.status(400).json({
       success: false,
       message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก'
     });
   }

   // Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   // Create user
   const user = await User.create({
     username,
     email,
     password: hashedPassword,
     firstName,
     lastName,
     phoneNumber,
     role: 'user',
     isActive: true
   });

   res.status(201).json({
     success: true,
     message: 'ลงทะเบียนสำเร็จ'
   });

 } catch (error) {
   console.error('Register error:', error);
   res.status(500).json({
     success: false,
     message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
   });
 }
};

// Login
exports.login = async (req, res) => {
 try {
   const { username, password } = req.body;

   // Validate input
   if (!username || !password) {
     return res.status(400).json({
       success: false,
       message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน'
     });
   }

   // Find user
   const user = await User.findOne({
     where: { 
       username,
       isActive: true
     }
   });

   if (!user) {
     return res.status(401).json({
       success: false,
       message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
     });
   }

   // Verify password
   const isValidPassword = await bcrypt.compare(password, user.password);
   if (!isValidPassword) {
     return res.status(401).json({
       success: false,
       message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
     });
   }

   // Generate JWT token
   const token = jwt.sign(
     { 
       id: user.id,
       role: user.role 
     },
     process.env.JWT_SECRET,
     { expiresIn: '1d' }
   );

   // Update last login
   await user.update({
     lastLogin: new Date()
   });

   // Send response
   res.json({
     success: true,
     message: 'เข้าสู่ระบบสำเร็จ',
     token,
     user: {
       id: user.id,
       username: user.username,
       email: user.email,
       firstName: user.firstName,
       lastName: user.lastName,
       role: user.role
     }
   });

 } catch (error) {
   console.error('Login error:', error);
   res.status(500).json({
     success: false,
     message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
   });
 }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: [
        'firstName',
        'lastName', 
        'gender',
        'email',
        'faculty',
        'major'
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลผู้ใช้'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, gender, faculty, major } = req.body;

    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูลผู้ใช้'
      });
    }

    // Update user
    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      gender: gender || user.gender,
      faculty: faculty || user.faculty,
      major: major || user.major
    });

    // ดึงข้อมูลที่อัพเดทแล้ว
    const updatedUser = await User.findByPk(req.userId);

    res.json({
      success: true,
      message: 'อัปเดตข้อมูลสำเร็จ',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        gender: updatedUser.gender,
        faculty: updatedUser.faculty,
        major: updatedUser.major
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    });
  }
};

module.exports = exports;