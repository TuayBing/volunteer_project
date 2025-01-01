const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Major = sequelize.define('Major', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'faculties',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'majors'
});

module.exports = Major;