const express = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signup", authController.registerController);
authRouter.post("/signin", authController.loginController);
authRouter.post("/google", authController.googleController);

module.exports = authRouter;
