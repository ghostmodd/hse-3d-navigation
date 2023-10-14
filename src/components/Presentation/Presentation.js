import React from "react";
import iphonePic from "../../images/iPhone 13 Pro.png";

const Presentation = () => {
  return(
    <section className="flex flex-col items-center mb-16 pb-16 border-b-2 border-gray-600">
      <p className="w-8/12 text-center text-xs text-gray-300 mb-2 m-auto">A convenient application with 3D visualization and navigation of the university for students.</p>
      <img className="mb-6 m-auto" src={iphonePic} alt="Скриншот прототипа приложения" />
      <button type="button" className="text-white border border-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-white dark:text-white hover:text-gray-400 hover:border-gray-400 transition-all">Get the app</button>
    </section>
  )
}

export default Presentation;
