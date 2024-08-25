const { Manga, Publisher, Genre, Author } = require("../models");
const { Op } = require("sequelize");

exports.createManga = async (req, res) => {
  try {
    const {
      title,
      original_title,
      author,
      artist,
      description,
      status,
      publication_year,
      demographic,
      genres,
      themes,
      cover_image_url,
      publisherId,
      total_chapters,
      average_rating,
    } = req.body;

    // Membuat Manga baru
    const manga = await Manga.create({
      title,
      original_title,
      author,
      artist,
      description,
      status,
      publication_year,
      demographic,
      cover_image_url,
      publisherId,
      total_chapters,
      average_rating,
    });

    // Menyertakan genre dan author jika ada
    if (genres && genres.length > 0) {
      const genreInstances = await Genre.findAll({ where: { name: genres } });
      await manga.addGenres(genreInstances);
    }

    if (themes && themes.length > 0) {
      const themeInstances = await Theme.findAll({ where: { name: themes } });
      await manga.addThemes(themeInstances);
    }

    res.status(201).json(manga);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating manga", error: error.message });
  }
};

exports.getAllMangas = async (req, res) => {
  try {
    const mangas = await Manga.findAll({
      include: [
        { model: Publisher, attributes: ["name"] },
        { model: Genre, attributes: ["name"] },
        { model: Author, attributes: ["name"] },
      ],
    });
    res.json(mangas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mangas", error: error.message });
  }
};

exports.getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id, {
      include: [
        { model: Publisher, attributes: ["name"] },
        { model: Genre, attributes: ["name"] },
        { model: Author, attributes: ["name"] },
      ],
    });
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json(manga);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching manga", error: error.message });
  }
};

exports.updateManga = async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id);
    if (!manga) return res.status(404).json({ message: "Manga not found" });

    const {
      title,
      original_title,
      author,
      artist,
      description,
      status,
      publication_year,
      demographic,
      genres,
      themes,
      cover_image_url,
      publisherId,
      total_chapters,
      average_rating,
    } = req.body;

    // Update Manga
    await manga.update({
      title,
      original_title,
      author,
      artist,
      description,
      status,
      publication_year,
      demographic,
      cover_image_url,
      publisherId,
      total_chapters,
      average_rating,
    });

    // Update genres and themes if provided
    if (genres && genres.length > 0) {
      const genreInstances = await Genre.findAll({ where: { name: genres } });
      await manga.setGenres(genreInstances);
    }

    if (themes && themes.length > 0) {
      const themeInstances = await Theme.findAll({ where: { name: themes } });
      await manga.setThemes(themeInstances);
    }

    res.status(200).json(manga);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating manga", error: error.message });
  }
};

exports.deleteManga = async (req, res) => {
  try {
    const deleted = await Manga.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Manga not found");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting manga", error: error.message });
  }
};

exports.searchMangas = async (req, res) => {
  try {
    const { title, author, genre } = req.query;
    let whereClause = {};

    if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
    if (author) whereClause.author = { [Op.iLike]: `%${author}%` };
    if (genre) whereClause.genres = { [Op.contains]: [genre] };

    const mangas = await Manga.findAll({ where: whereClause });
    res.json(mangas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching mangas", error: error.message });
  }
};
