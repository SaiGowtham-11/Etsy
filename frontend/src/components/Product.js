import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  console.log(product)
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.productID}`}>
        <Card.Img variant='top' src={product.productImage} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.productID}`}>
          <Card.Title as='div'>
            <strong>{product.productName}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
