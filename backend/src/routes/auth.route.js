const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", authController.registerController);
authRouter.post("/signin", authController.loginController);

module.exports = authRouter;
