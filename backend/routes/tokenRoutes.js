const express = require("express");
const router = express.Router();
const { handleTokenRefresh } = require("../controllers/tokenController");

router.get("/refresh", handleTokenRefresh);

module.exports = router;
