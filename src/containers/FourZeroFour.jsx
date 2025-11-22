import React from "react";
import fourZeroFourImg from "../assets/fourzerofour.png";
import { useNavigate } from "react-router-dom";

const FourZeroFour = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 text-center">
      <img
        src={fourZeroFourImg}
        className="-mb-20 m-auto md:w-[70vw] lg:w-[40vw]"
        alt=""
      />
      <button
        onClick={() => {
          navigate("/");
        }}
        className="m-auto group flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-white text-black font-semibold rounded-xl hover:bg-slate-100 transition-all"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default FourZeroFour;
