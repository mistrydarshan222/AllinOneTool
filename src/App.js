import React, { Component } from 'react';
import {Routes, Route } from "react-router-dom";

import Header from './pages/Header';
import Footer from './pages/Footer';
import Content from './pages/Content';
import Home from './pages/Home';



function App() {
  return (
    <>

      <Header />
           
        <Routes> 
            <Route path="/" element={<Home />} />      
            <Route path="web" element={<Content name="web" />} />
            <Route path="email" element={ <Content name="email" />} />
            <Route path="url2domain" element={ <Content name="url2domain" />} />
            <Route path="expireddomain" element={ <Content name="expireddomain" />} />

        </Routes>
     
    <Footer />

    </>
  );
}

export default App;
