"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      Author.belongsToMany(models.Manga, {
        through: "MangaAuthor",
        foreignKey: "authorId",
      });
    }
  }

  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Author",
      timestamps: true,
      underscored: true,
    }
  );

  return Author;
};
