import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setData } from "./slices/productSlice.js";
import { OneProduct } from "./components/OneProduct";
import { SortedProducts } from "./components/SortedProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => {
        dispatch(setData(result));
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route element={<SortedProducts />} path="/" />
        <Route element={<OneProduct />} path="/oneproduct" />
      </Routes>
    </BrowserRouter>
  );
}
