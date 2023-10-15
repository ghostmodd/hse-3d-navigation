import React from "react";

const Footer = () => {
  return (

    <footer class="dark:bg-black flex justify-between">
      <div class="grid grid-cols-2 w-full justify-between px-4 py-6 lg:py-8 md:grid-cols-4">
        <div>
          <h2 class="mb-6 text-sm font-semibold text-white uppercase">Application</h2>
          <ul class="text-white dark:text-gray-400 font-medium">
            <li class="mb-4">
              <a href="#" className="hover:text-gray-400">Owerview</a>
            </li>
            <li class="mb-4">
              <a href="#" className="hover:text-gray-400">Features</a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gray-400">About</a>
            </li>
          </ul>
        </div>
        <h2 className="text-right">@officecreators</h2>
      </div>
    </footer>

  )
}

export default Footer;
