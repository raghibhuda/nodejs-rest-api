'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Task name can not be empty'
      },
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
      },
    }
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Task;
};