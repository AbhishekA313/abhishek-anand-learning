'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    source: DataTypes.STRING,
    account_number: DataTypes.NUMBER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    customer_number: DataTypes.STRING,
    case_reference: DataTypes.STRING,
    triggered_by_rule: DataTypes.STRING,
    record_type: DataTypes.STRING,
    notes: DataTypes.STRING,
    senior_analyst_user_id: DataTypes.NUMBER,
    investigating_analyst_user_id: DataTypes.NUMBER,
    case_outcome: DataTypes.STRING,
    category_of_match: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};