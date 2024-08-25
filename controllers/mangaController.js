const { Manga } = require("../models");

exports.createManga = async (req, res) => {
  try {
    const manga = await Manga.create(req.body);
    res.status(201).json(manga);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating manga", error: error.message });
  }
};

exports.getAllMangas = async (req, res) => {
  try {
    const mangas = await Manga.findAll();
    res.json(mangas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching mangas", error: error.message });
  }
};

exports.getMangaById = async (req, res) => {
  try {
    const manga = await Manga.findByPk(req.params.id);
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
    const [updated] = await Manga.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedManga = await Manga.findByPk(req.params.id);
      return res.json(updatedManga);
    }
    throw new Error("Manga not found");
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
