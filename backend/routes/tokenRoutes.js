const express = require("express");
const router = express.Router();
const { handleTokenRefresh } = require("../controller/tokenController");

router.get("/refresh", handleTokenRefresh);

module.exports = router;
