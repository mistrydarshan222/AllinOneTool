import React from 'react'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    
    <>
        <div>        
            <footer className="bg-[#03a9f4] relative bottom-[0px] w-[100%] p-4 sm:p-6 dark:bg-gray-900">
                <div className="md:flex md:justify-around">
                    <div className="mb-6 md:mb-0 flex justify-center">
                        <Link to="/" className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" />
                            <span className="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AllInOneTool</span>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <div>   
                            <h2 className="text-white text-xl mb-2 font-bold uppercase dark:text-white">Resources</h2>
                            <ul className="text-white dark:text-gray-400">
                                <li className="mb-4">
                                    <Link to="/web" className="hover:underline">Web Extractor</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/email" className="hover:underline">Email Extractor</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/url2domain" className="hover:underline">URLtoDomain Extractor</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/expireddomain" className="hover:underline">Expired Domain Finder</Link>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
        
                <div className="flex justify-center mt-5">
                    <span className="text-sm text-white text-center">
                        © 2022 
                        <Link to="/" className="hover:underline text-white">AllInoneTool™</Link>
                        . All Rights Reserved.
                    </span>
                    
                </div>
            </footer>
        </div>
    
    </>    
    )
}

export default Footer
