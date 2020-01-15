const express = require("express");
const router = express.Router();

const { getStores, createStore } = require("../controllers/stores");

router
  .route("/")
  .get(getStores)
  .post(createStore);

module.exports = router;
