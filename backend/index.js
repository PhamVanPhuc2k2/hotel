const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user.route");
const authRouter = require("./src/routes/auth.route");
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Kết nối database thành công!");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
