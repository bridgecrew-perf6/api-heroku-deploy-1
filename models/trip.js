const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model { };

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    trip_budget: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    traveller_amount: {
      type: DataTypes.INTEGER,
    },
    traveller_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'traveller',
        key: 'id',
        unique: false
      }
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
        unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'trip'
  }
);

module.exports = Trip;