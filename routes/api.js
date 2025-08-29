const express = require("express");
const router = express.Router();
const { handlePost, handleGet } = require("../controllers/apiController");

// GET route
router.get("/", handleGet);

// POST route
router.post("/", handlePost);

module.exports = router;
