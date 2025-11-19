import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/head-01-01.png";
import FloatingInput from "../components/FloatingInput";
import { toast } from "react-toastify";
import { useHomeContext } from "../context/HomeContext";
import { localHost, renderAPI } from "../constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ⭐ NEW: Get referral code from URL
  const referralFromURL = searchParams.get("ref");
  const [refLocked] = useState(Boolean(referralFromURL));

  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    referralCode: referralFromURL || "", // ⭐ Auto-fill referral
  });

  const { setLoggedIn } = useHomeContext();

  const passwordChecks = useMemo(() => {
    const { password } = signUpData;
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    };
  }, [signUpData.password]);

  const allFieldsFilled = Object.values(signUpData)
    .filter((_, i, arr) => i !== arr.length - 1)
    .every((val) => val.trim() !== "");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
  const passwordValid =
    passwordChecks.hasUppercase &&
    passwordChecks.hasNumber &&
    passwordChecks.hasSpecialChar;

  const isFormValid = allFieldsFilled && passwordValid && emailValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowEmailError(true);

    if (!isFormValid) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/auth/register`,
        signUpData
      );

      const { token, name, email, referralCode } = res.data;

      const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        "bj_userData",
        JSON.stringify({ token, name, email, referralCode, expiry })
      );

      setLoggedIn(true);

      if (referralCode) {
        toast.success(`Account created! Your referral code: ${referralCode}`);
      } else {
        toast.success("Account created successfully!");
      }

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

          {/* Referral Code (Auto-Locked if came from URL) */}
          <div className="mt-4">
            <FloatingInput
              value={signUpData.referralCode}
              onChange={(e) =>
                !refLocked &&
                setSignUpData({
                  ...signUpData,
                  referralCode: e.target.value.toUpperCase(),
                })
              }
              disabled={refLocked} // ⭐ USER CAN’T EDIT IF URL PROVIDED IT
              label={
                refLocked
                  ? "Referral Code (Auto-applied)"
                  : "Referral Code (Optional)"
              }
            />

            {!refLocked && (
              <p className="text-xs text-gray-400 mt-1 text-left">
                Have a referral? Enter it here!
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!allFieldsFilled || loading}
            className={`mt-8 rounded-4xl ${
              isFormValid
                ? "bg-blue-800 hover:bg-blue-900"
                : "bg-blue-300 cursor-not-allowed"
            } text-white font-bold px-8 py-4 text-sm m-auto w-[80%] transition-all duration-200`}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="mt-2">
          Already have an account?{" "}
          <strong
            onClick={() => navigate("/signin")}
            className="underline cursor-pointer"
          >
            Log in
          </strong>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
