const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: true
  },
  faculty: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'faculties',
      key: 'id'
    }
  },
  major: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'majors',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'users'
});

// กำหนดความสัมพันธ์ระหว่างตาราง
User.associate = (models) => {
  User.belongsTo(models.Faculty, {
    foreignKey: 'faculty',
    as: 'userFaculty'
  });
  
  User.belongsTo(models.Major, {
    foreignKey: 'major',
    as: 'userMajor'
  });
};

module.exports = User;