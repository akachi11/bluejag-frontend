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
        className="bg-blue-950 montserrat px-8 py-4 rounded-3xl font-semibold"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default FourZeroFour;
