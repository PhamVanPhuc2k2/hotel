const authService = require("../services/auth.service");

const authController = {
  registerController: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          status: "ERR",
          message: "Chưa nhập đầy đủ thông tin!",
        });
      }
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const checkEmail = regex.test(email);
      if (!checkEmail) {
        return res.status(400).json({
          status: "ERR",
          message: "Email chưa đúng định dạng!",
        });
      }
      const response = await authService.registerService(req.body);
      return res.status(response.code).json(response);
    } catch (e) {
      return res.status(500).json({
        status: "ERR",
        message: e.message || "Đã xảy ra lỗi ở phía server!",
      });
    }
  },
  loginController: async (req, res) => {
    try {
      const { email } = req.body;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const checkEmail = regex.test(email);
      if (!checkEmail) {
        return res.status(400).json({
          status: "ERR",
          message: "Email nhập không đúng định dạng!",
        });
      }
      const response = await authService.loginService(req.body);
      const { refresh_token, ...others } = response;
      if (response.status === "OK") {
        res.cookie("refreshToken", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
      }
      return res.status(others.code).json(others);
    } catch (e) {
      return res.status(500).json({
        status: "ERR",
        message: e.message || "Đã xảy ra lỗi ở phía server!",
      });
    }
  },
};

module.exports = authController;
