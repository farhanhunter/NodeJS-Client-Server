"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Publisher extends Model {
    static associate(models) {
      // Define associations here, if necessary
      Publisher.hasMany(models.Manga, { foreignKey: "publisherId" });
    }
  }

  Publisher.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Publisher",
      timestamps: true,
      underscored: true,
    }
  );

  return Publisher;
};
