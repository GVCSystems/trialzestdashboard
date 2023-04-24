'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    machine: DataTypes.STRING,
    command: DataTypes.STRING,
    p1: DataTypes.INTEGER,
    p2: DataTypes.INTEGER,
    p3: DataTypes.INTEGER,
    p4: DataTypes.INTEGER,
    p5: DataTypes.INTEGER,
    p6: DataTypes.INTEGER
  }, {});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};