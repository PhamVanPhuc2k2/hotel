import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/user/authSlice";
import Auth from "../components/Auth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    dispatch(loginStart());
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status === "OK") {
        dispatch(
          loginSuccess({
            user: res.data.user,
            access_token: res.data.access_token,
          })
        );
        setSuccess("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatch(loginFailed(res.data.message));
        setError(res.data.message);
      }
    } catch (err) {
      dispatch(loginFailed(err.response?.data?.message || err.message));
      setError(
        err.response?.data?.message ||
          err.message ||
          "Có lỗi xảy ra, vui lòng thử lại sau!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg bg-white"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg bg-white"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="bg-green-700 text-white p-3 rounded-lg uppercase disabled:opacity-95 cursor-pointer">
          {loading ? "Loading..." : "Sign up"}
        </button>
        <Auth />
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <div className="flex gap-2 mt-5">
          <p className="">Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
