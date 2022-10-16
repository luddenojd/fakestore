import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { setItems } from "../slices/cartSlice.js"
import "../styles/OneProduct.scss"

export function OneProduct() {
  const products = useSelector((state) => state.products.data)
  const [oneProduct, setOneProduct] = useState()

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const id = urlParams.get("id")

  useEffect(() => {
    if (products) {
      const newProducts = [...products].filter(
        (current) => current.id === parseInt(id)
      )?.[0]
      setOneProduct(newProducts)
    }
  }, [id, products])

  function addToCart() {
    const newProducts = [...products].filter(
      (current) => current.id === parseInt(id)
    )?.[0]
    setItems(newProducts)
  }

  return (
    oneProduct && (
      <div>
        <ul>
          <li className="one-product">
            <img src={oneProduct.image} width="250" alt="" />
            <h2>{oneProduct.title}</h2>
            <p>${oneProduct.price}</p>
            <p>{oneProduct.description}</p>
          </li>
          <p onClick={addToCart}>Add to cart</p>
        </ul>
        <Link to="/">
          <p>Tillbaka</p>
        </Link>
      </div>
    )
  )
}
