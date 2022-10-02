import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/SortedProducts.scss";

export function SortedProducts() {
  const products = useSelector((state) => state.products.data);
  const [allProducts, setAllProducts] = useState();
  const [sortedProducts, setSortedProducts] = useState();
  const [category, setCategory] = useState("");

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  console.log(allProducts);

  useEffect(() => {
    let newProducts = products;
    if (category !== "") {
      newProducts = products.filter((current) => current.category === category);
      setSortedProducts(newProducts);
      setAllProducts(null);
    }

    console.log(newProducts);
  }, [category]);

  return (
    products && (
      <div className="wrapper">
        <ul className="menu">
          <li id="logo" onClick={() => setAllProducts(products)}>
            WebShop
          </li>
          <li onClick={() => setCategory("women's clothing")}>
            Womens clothing
          </li>
          <li onClick={() => setCategory("men's clothing")}>Mens clothing</li>
          <li onClick={() => setCategory("electronics")}>Electronics</li>
          <li onClick={() => setCategory("jewelery")}>Jewelery</li>
        </ul>
        <ul className="products-menu">
          {allProducts?.map((product) => (
            <Link
              className="link-to-oneproduct"
              to={`oneproduct?id=${product.id}`}
            >
              <li className="list-item" key={product.id}>
                <img src={product.image} width="100" alt="" />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </li>
            </Link>
          ))}
        </ul>
        <ul className="products-menu">
          {sortedProducts?.map((product) => (
            <Link
              className="link-to-oneproduct"
              to={`oneproduct?id=${product.id}`}
            >
              <li className="list-item" key={product.id}>
                <img src={product.image} width="100" alt="" />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </li>
            </Link>
          ))}
        </ul>
        <ul>
          <li>Previous</li>
          <li>Next</li>
        </ul>
      </div>
    )
  );
}
