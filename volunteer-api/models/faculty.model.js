const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faculty = sequelize.define('Faculty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'faculties'
});

module.exports = Faculty;