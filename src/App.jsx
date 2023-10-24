
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Layout from "./pages/Layout";
import CountryInfo from "./pages/CountryInfo";
import { useEffect, useState } from "react";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/CountryInfo/:Country' element={<CountryInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>


  )
}