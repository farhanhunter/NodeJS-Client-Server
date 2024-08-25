"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.belongsToMany(models.Manga, {
        through: "MangaGenre",
        foreignKey: "genreId",
      });
    }
  }

  Genre.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Genre",
      timestamps: true,
      underscored: true,
    }
  );

  return Genre;
};
