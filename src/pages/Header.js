import React from 'react'

import { Link } from 'react-router-dom';

function Header() {
  return (
    
    <div>
      <header>
        <nav className="bg-[#03a9f4] border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center text-white text-xl font-semibold whitespace-nowrap dark:text-white">AllInOneTool</span>
            </Link>
            
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <Link to="/web" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-gray-700">Web Extractor</Link>
                    </li>
                    <li>
                        <Link to="/email" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Email Extractor</Link>
                    </li>
                    <li>
                        <Link to="/url2domain" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">URLtoDomain Extractor</Link>
                    </li>
                    <li>
                        <Link to="/expireddomain" className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Expired Domain Finder</Link>
                    </li>                    
                </ul>
            </div>
        </div>
        </nav>
      </header>
    </div>
  )
}

export default Header;
