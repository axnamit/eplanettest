const express = require("express");
const { getUserRepos, getAllCommits } = require("../controller/controller");
const router = express.Router();

router.get("/user", getUserRepos);
router.get("/getallcommits", getAllCommits);
module.exports = router;
