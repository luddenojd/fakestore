import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function OneProduct() {
  const products = useSelector((state) => state.products.data);
  const [oneProduct, setOneProduct] = useState();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  useEffect(() => {
    if (products) {
      const newProducts = [...products].filter((current) => current.id == id);
      setOneProduct(newProducts);
    }
  }, [id, products]);

  return (
    products && (
      <div>
        <ul>
          {oneProduct?.map((product) => (
            <li>
              <img src={product.image} width="100" alt="" />
              <p>{product.title}</p>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}
