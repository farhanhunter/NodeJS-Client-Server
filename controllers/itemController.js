const { Item } = require("../models");

exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create({ name: req.body.name });
    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating item", error: error.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items", error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching item", error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const [updated] = await Item.update(
      { name: req.body.name },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      return res.json(updatedItem);
    }
    throw new Error("Item not found");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating item", error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Item not found");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: error.message });
  }
};
