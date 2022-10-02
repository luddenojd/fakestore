import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function SortedProducts() {
  const products = useSelector((state) => state.products.data);
  const [allProducts, setAllProducts] = useState();
  const [sortedProducts, setSortedProducts] = useState();
  const [category, setCategory] = useState("");

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  useEffect(() => {
    if (category) {
      setAllProducts(null);
    }
    if (allProducts) {
      setCategory(null);
    }
  }, [category, allProducts]);

  useEffect(() => {
    let newProducts = products;
    if (category !== "") {
      newProducts = products.filter((current) => current.category === category);
      setSortedProducts(newProducts);
    }

    console.log(newProducts);
  }, [category, products]);

  return (
    products && (
      <div>
        <ul>
          <li onClick={() => setAllProducts(products)}>All Products</li>
          <li onClick={() => setCategory("women's clothing")}>
            Womens clothing
          </li>
          <li onClick={() => setCategory("men's clothing")}>Mens clothing</li>
          <li onClick={() => setCategory("electronics")}>Electronics</li>
          <li onClick={() => setCategory("jewelery")}>Jewelery</li>
        </ul>
        <ul>
          {allProducts?.map((product) => (
            <Link to={`oneproduct?id=${product.id}`}>
              <li key={product.id}>
                <img src={product.image} width="100" alt="" />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </li>
            </Link>
          ))}
        </ul>
        <ul>
          {sortedProducts?.map((product) => (
            <Link to={`oneproduct?id=${product.id}`}>
              <li key={product.id}>
                <img src={product.image} width="100" alt="" />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  );
}
