const express = require("express");
const router = express.Router();
const mangaController = require("../controllers/mangaController");

router.post("/", mangaController.createManga);
router.get("/", mangaController.getAllMangas);
router.get("/search", mangaController.searchMangas);
router.get("/:id", mangaController.getMangaById);
router.put("/:id", mangaController.updateManga);
router.delete("/:id", mangaController.deleteManga);

module.exports = router;
