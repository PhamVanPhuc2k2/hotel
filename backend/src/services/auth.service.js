const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

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
      return {
        status: "OK",
        message: "Đăng nhập thành công!",
        code: 200,
        user: checkUser,
      };
    } catch (e) {
      throw e;
    }
  },
};

module.exports = authService;
