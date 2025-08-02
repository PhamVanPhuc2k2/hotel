import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/authSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const res = await axios.post("/api/auth/google", {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });
      const data = res.data;
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log("Không thể đăng nhập với tài khoản google", error);
    }
  };
  return (
    <button
      onClickCapture={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer"
    >
      Continue with google
    </button>
  );
};

export default Auth;
