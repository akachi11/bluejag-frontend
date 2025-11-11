import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/head-01-01.png";
import FloatingInput from "../components/FloatingInput";
import { toast } from "react-toastify";
import { useHomeContext } from "../context/HomeContext";
import { localHost, renderAPI } from "../constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const { setLoggedIn } = useHomeContext();

  // ✅ Password requirement checks (live feedback)
  const passwordChecks = useMemo(() => {
    const { password } = signUpData;
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };
  }, [signUpData.password]);

  const allFieldsFilled = Object.values(signUpData).every(
    (val) => val.trim() !== ""
  );
  const passwordValid =
    passwordChecks.hasUppercase &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSpecialChar;

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
  const isFormValid = allFieldsFilled && passwordValid && emailValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEmailError(true); // show email error only after attempting submit

    if (!isFormValid) return; // stop submission if invalid

    setLoading(true);
    try {
      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/auth/register`,
        signUpData
      );
      const { token, name, email } = res.data;

      const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem(
        "bj_userData",
        JSON.stringify({ token, name, email, expiry })
      );
      setLoggedIn(true);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-32 items-center justify-center max-w-[400px] m-auto">
      <div className="text-center w-full">
        <img
          src={logo}
          className="w-[120px] h-[120px] object-contain m-auto mb-4"
          alt="BlueJag logo"
        />
        <p className="font-bold montserrat text-2xl">BLUEJAG SIGNUP</p>
        <p className="px-8 mt-4">One account. Unlimited benefits.</p>

        <form onSubmit={handleSubmit} className="px-6">
          <FloatingInput
            value={signUpData.firstName}
            onChange={(e) =>
              setSignUpData({ ...signUpData, firstName: e.target.value })
            }
            label={"First Name"}
          />

          <FloatingInput
            value={signUpData.lastName}
            onChange={(e) =>
              setSignUpData({ ...signUpData, lastName: e.target.value })
            }
            label={"Last Name"}
          />

          <FloatingInput
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
            label={"Email Address"}
          />
          {/* Show email error ONLY after submit attempt */}
          {showEmailError && !emailValid && (
            <p className="text-red-500 text-xs mt-1 text-left">
              Please enter a valid email address
            </p>
          )}

          <FloatingInput
            value={signUpData.phone}
            onChange={(e) =>
              setSignUpData({ ...signUpData, phone: e.target.value })
            }
            label={"Phone Number"}
          />

          <FloatingInput
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
            label={"Password"}
            isPassword
          />

          {/* ✅ Live Password Requirement Card */}
          <div className="bg-gray-800 rounded-lg p-3 mt-2 text-left text-sm shadow-sm">
            <p className="font-semibold text-white mb-2">
              Password must include:
            </p>
            <ul className="space-y-1">
              <li
                className={`flex items-center gap-2 ${
                  passwordChecks.hasUppercase
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {passwordChecks.hasUppercase ? "✅" : "❌"} At least one capital
                letter
              </li>
              <li
                className={`flex items-center gap-2 ${
                  passwordChecks.hasNumber ? "text-green-600" : "text-gray-400"
                }`}
              >
                {passwordChecks.hasNumber ? "✅" : "❌"} At least one number
              </li>
              <li
                className={`flex items-center gap-2 ${
                  passwordChecks.hasSpecialChar
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {passwordChecks.hasSpecialChar ? "✅" : "❌"} At least one
                special character
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!allFieldsFilled || loading}
            className={`mt-8 rounded-4xl ${
              isFormValid
                ? "bg-blue-800 hover:bg-blue-900"
                : "bg-blue-300 cursor-not-allowed"
            } text-white montserrat font-bold px-8 py-4 text-sm m-auto w-[80%] max-w-[300px] transition-all duration-200`}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="mt-2">
          Already have an account?{" "}
          <strong
            onClick={() => navigate("/signin")}
            className="underline montserrat cursor-pointer"
          >
            Log in
          </strong>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
