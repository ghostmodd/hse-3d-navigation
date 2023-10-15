import React from "react";
import ContentNavigation from "../ContentNavigation/ContentNavigation";
import { useNavigate } from "react-router-dom";

const Promo = () => {
  const navigate = useNavigate()

  function handleSignUpClick() {
    navigate("/signup")
  }

  function handleLoginClick() {
    navigate("/signin")
  }

  return (
    <section className="w-11/12 flex flex-col justify-center mb-20 m-auto">
      <h1 className="text-center mb-3 font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#70FFCB] from-0% via-[#34AAFFDE] via-25% via-[#DB73FFD1] via-47% to-[#FF001F] to-114%">
        <span className="font-normal text-3xl">HSE</span><br></br>Mobile Navigation
      </h1>
      <p className="text-center mb-6 text-gray-300">A convenient application with 3D visualization and navigation of the university for students.</p>
      <div className="flex justify-between w-8/12 mb-10 m-auto">
        <button className="w-28 bg-gray-100 text-black pt-1 pb-1 pl-4 pr-4 rounded-3xl hover:bg-gray-300 transition-all ease-linear duration-100" onClick={handleSignUpClick}>Sign Up</button>
        <button className="w-28 bg-gray-100 text-black pt-1 pb-1 pl-4 pr-4 rounded-3xl hover:bg-gray-300 transition-all ease-linear duration-100" onClick={handleLoginClick}>Log In</button>
      </div>

      <ContentNavigation />
    </section>
  )
}

export default Promo;
