const express = require("express");
const router = express.Router();
const {userRegister, userLogin, userCurrent} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/current", userCurrent, validateToken);
module.exports = router;