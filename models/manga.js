"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    static associate(models) {
      // define association here if you have any
    }
  }
  Manga.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_title: DataTypes.STRING,
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM("Ongoing", "Completed", "Hiatus", "Cancelled"),
        allowNull: false,
      },
      publication_year: DataTypes.INTEGER,
      demographic: DataTypes.STRING,
      genres: DataTypes.ARRAY(DataTypes.STRING),
      themes: DataTypes.ARRAY(DataTypes.STRING),
      cover_image_url: DataTypes.STRING,
      publisher: DataTypes.STRING,
      total_chapters: DataTypes.INTEGER,
      average_rating: DataTypes.DECIMAL(3, 2),
    },
    {
      sequelize,
      modelName: "Manga",
      timestamps: true,
      underscored: true,
    }
  );
  return Manga;
};
