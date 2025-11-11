import React, { useState } from "react";
import logo from "../assets/head-01-01.png";
import FloatingInput from "../components/FloatingInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useHomeContext } from "../context/HomeContext";
import { localHost, renderAPI } from "../constants";

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useHomeContext();

  const validateFields = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInData.email);
    const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(
      signInData.password
    );

    const newErrors = {
      email: emailValid ? "" : "Please enter a valid email address",
      password: passwordValid
        ? ""
        : "Password must include a capital letter, number, and special character",
    };

    setErrors(newErrors);

    return emailValid && passwordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before calling API
    const isValid = validateFields();
    if (!isValid) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/auth/login`,
        signInData
      );
      const { token, name, email } = res.data;

      const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem(
        "bj_userData",
        JSON.stringify({ token, name, email, expiry })
      );
      setLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center max-w-[400px] m-auto">
      <div className="text-center w-full">
        <img
          src={logo}
          className="w-[120px] h-[120px] object-contain m-auto mb-4"
          alt="BlueJag logo"
        />
        <p className="font-bold montserrat text-2xl">BLUEJAG SIGN IN</p>
        <p className="px-8 mt-4">
          Shop your styles, earn your rewards, track those orders & train with
          us.
        </p>

        <form onSubmit={handleSubmit} className="px-6 mt-6">
          <div className="mb-4">
            <FloatingInput
              value={signInData.email}
              onChange={(e) =>
                setSignInData({ ...signInData, email: e.target.value })
              }
              label={"Email Address"}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <FloatingInput
              value={signInData.password}
              onChange={(e) =>
                setSignInData({ ...signInData, password: e.target.value })
              }
              label={"Password"}
              isPassword
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 text-left">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !signInData.email || !signInData.password}
            className={`mt-6 rounded-4xl bg-blue-800 text-white montserrat font-bold px-8 py-4 text-sm m-auto w-[80%] max-w-[300px] transition-all duration-200 ${
              (loading || !signInData.email || !signInData.password) &&
              "opacity-50 cursor-not-allowed bg-blue-300"
            }`}
          >
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>

        <p className="mt-2">
          Don’t have an account?{" "}
          <strong
            className="underline montserrat cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </strong>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
