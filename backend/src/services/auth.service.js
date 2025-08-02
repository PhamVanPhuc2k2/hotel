const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("../utils/jwt");

const authService = {
  registerService: async (data) => {
    try {
      const { username, email, password } = data;
      const checkUser = await User.findOne({
        username: username,
      });
      if (checkUser) {
        return {
          status: "ERR",
          message: "username đã tồn tại!",
          code: 409,
        };
      }
      const checkEmail = await User.findOne({
        email: email,
      });
      if (checkEmail) {
        return {
          status: "ERR",
          message: "Email đã tồn tại!",
          code: 409,
        };
      }
      const hashPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username: username,
        email: email,
        password: hashPassword,
      });
      return {
        status: "OK",
        message: "Đăng ký tài khoản thành công!",
        code: 200,
        newUser: newUser,
      };
    } catch (e) {
      throw e;
    }
  },
  loginService: async (data) => {
    try {
      const { email, password } = data;
      const checkUser = await User.findOne({
        email: email,
      });
      if (!checkUser) {
        return {
          status: "ERR",
          message: "Tài khoản chưa được đăng ký!",
          code: 404,
        };
      }
      const comparePassword = bcryptjs.compareSync(
        password,
        checkUser.password
      );
      if (!comparePassword) {
        return {
          status: "ERR",
          message: "Mật khẩu không chính xác!",
          code: 404,
        };
      }
      const payload = { id: checkUser._id, role: checkUser.role };
      const access_token = jwt.generateAccessToken(payload);
      const refresh_token = jwt.generateRefreshToken(payload);
      const user = checkUser.toObject();
      delete user.password;
      return {
        status: "OK",
        message: "Đăng nhập thành công!",
        code: 200,
        user: user,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    } catch (e) {
      throw e;
    }
  },
  googleService: async ({ username, email, avatar }) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const payload = { id: user._id, role: user.role };
        const access_token = jwt.generateAccessToken(payload);
        const refresh_token = jwt.generateRefreshToken(payload);
        const userOutPassword = user.toObject();
        delete userOutPassword.password;
        return {
          status: "OK",
          message: "Đăng nhập thành công!",
          code: 200,
          user: userOutPassword,
          access_token: access_token,
          refresh_token: refresh_token,
        };
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = await User.create({
          username:
            username.split(" ").join("").toLowerCase() +
            Math.random().toString(36).slice(-4),
          email: email,
          password: hashPassword,
          avatar: avatar,
        });
        const newUserOutPassword = newUser.toObject();
        delete newUserOutPassword.password;
        const payload = { id: newUser._id, role: newUser.role };
        const access_token = jwt.generateAccessToken(payload);
        const refresh_token = jwt.generateRefreshToken(payload);
        return {
          status: "OK",
          message: "Đăng ký tài khoản thành công!",
          code: 200,
          newUser: newUserOutPassword,
          access_token: access_token,
          refresh_token: refresh_token,
        };
      }
    } catch (e) {
      throw e;
    }
  },
};

module.exports = authService;
