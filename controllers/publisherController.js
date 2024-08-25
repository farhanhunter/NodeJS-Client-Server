const { Publisher } = require("../models");

// Create Publisher
exports.createPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.create(req.body);
    res.status(201).json(publisher);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating publisher", error: error.message });
  }
};

// Get All Publishers
exports.getAllPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.findAll();
    res.status(200).json(publishers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching publishers", error: error.message });
  }
};

// Get Publisher by Name
exports.getPublisherByName = async (req, res) => {
  try {
    const name = req.query.name;
    const publishers = await Publisher.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    res.status(200).json(publishers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching publishers", error: error.message });
  }
};

// Get Publisher by ID
exports.getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findByPk(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: "Publisher not found" });
    }
    res.status(200).json(publisher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching publisher", error: error.message });
  }
};

// Update Publisher
exports.updatePublisher = async (req, res) => {
  try {
    const [updated] = await Publisher.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPublisher = await Publisher.findByPk(req.params.id);
      return res.status(200).json(updatedPublisher);
    }
    throw new Error("Publisher not found");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating publisher", error: error.message });
  }
};

// Delete Publisher
exports.deletePublisher = async (req, res) => {
  try {
    const deleted = await Publisher.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Publisher not found");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting publisher", error: error.message });
  }
};
