import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

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
      console.log(newProducts)
    }
  }, [id, products])

  return (
    oneProduct && (
      <div>
        <ul>
          <li>
            <img src={oneProduct.image} width="100" alt="" />
            <p>{oneProduct.title}</p>
            <p>{oneProduct.price}</p>
            <p>{oneProduct.description}</p>
          </li>
        </ul>
        <Link to="/">
          <p>Tillbaka</p>
        </Link>
      </div>
    )
  )
}
