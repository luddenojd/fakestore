import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import "../styles/SortedProducts.scss";
import { optionValues } from "../helper/constant";

export function SortedProducts() {
  const products = useSelector((state) => state.products.data);

  const productsPerPage = 5;

  const [sortedProducts, setSortedProducts] = useState();
  const [category, setCategory] = useState("");
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState();
  const pagesVisited = pageNumber * productsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
    if (products) {
      setPageCount(Math.ceil(products.length / productsPerPage));
    }
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
          <select onChange={(e) => setMinValue(e.target.value)} name="Min">
            {optionValues.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <label htmlFor="Max">Max price</label>
          <select onChange={(e) => setMaxValue(e.target.value)} name="Max">
            {optionValues.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <ul className="products-menu">
          {sortedProducts
            ?.slice(pagesVisited, pagesVisited + productsPerPage)
            .map((product) => (
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
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          // disabledClassName={"paginationDisabled"}
          // activeClassName={"paginationActive"}
        />
      </div>
    )
  );
}
