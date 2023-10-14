import React from "react";
import { Link } from "react-router-dom";

const ContentNavigation = () => {
  return(
    <nav className="w-9/12 flex justify-between m-auto">
      <Link className="block hover:text-gray-300 transition-all ease-linear duration-100">How it works?</Link>
      <Link className="block hover:text-gray-300 transition-all ease-linear duration-100">Features</Link>
      <Link className="block hover:text-gray-300 transition-all ease-linear duration-100">Support</Link>
    </nav>
  )
}

export default ContentNavigation;
