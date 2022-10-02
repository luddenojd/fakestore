import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/SortedProducts.scss";

export function SortedProducts() {
  const products = useSelector((state) => state.products.data);
  const optionValues = [
    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
    800, 850, 900, 950, 1000,
  ];

  const [allProducts, setAllProducts] = useState();
  const [sortedProducts, setSortedProducts] = useState();
  const [category, setCategory] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  function handleMin(event) {
    const min = event.target.value;
    setMinValue(min);
    console.log(minValue);
  }

  function handleMax(event) {
    const max = event.target.value;
    setMaxValue(max);
    console.log(maxValue);
  }

  useEffect(() => {
    let newProducts = products;
    if (category !== "") {
      newProducts = products.filter((current) => current.category === category);
    }
    if (minValue !== 0 && maxValue !== 0) {
      newProducts = products.filter(
        (current) => current.price >= minValue && current.price <= maxValue
      );
    }
    setSortedProducts(newProducts);
    setAllProducts(null);
  }, [category, products, maxValue, minValue]);

  return (
    products && (
      <div className="wrapper">
        <ul className="menu">
          <li id="logo" onClick={() => setSortedProducts(products)}>
            WebShop
          </li>
          <li onClick={() => setCategory("women's clothing")}>
            Womens clothing
          </li>
          <li onClick={() => setCategory("men's clothing")}>Mens clothing</li>
          <li onClick={() => setCategory("electronics")}>Electronics</li>
          <li onClick={() => setCategory("jewelery")}>Jewelery</li>
        </ul>
        <div className="min-max-range">
          <label htmlFor="Min">Min price</label>
          <select onChange={handleMin} name="Min">
            {optionValues.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="Max">Max price</label>
          <select onChange={handleMax} name="Max">
            {optionValues.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <ul className="products-menu">
          {allProducts?.map((product) => (
            <Link
              className="link-to-oneproduct"
              to={`product?id=${product.id}`}
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
              to={`product?id=${product.id}`}
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
