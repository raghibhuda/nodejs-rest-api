'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type:DataTypes.STRING,
      allowNull:{
        args:false,
        msg:'Product name can not be empty'
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:{
        args:false,
        msg:'Product name can not be empty'
      }
    },
    availability: {
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    },
    quantity:{
      type:DataTypes.INTEGER,
      defaultValue:1,
    },
    categoryID: {
      type:DataTypes.INTEGER,
      allowNull: {
        args: false,
      },
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryID',
    });
  };
  return Product;
};