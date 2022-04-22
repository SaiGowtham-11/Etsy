import React, { Component, useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { addFavourites } from '../actions/userActions'

const Product = ({ product }) => {
  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin
  const [favourite, setFavourite] = useState(false)
  const [favourites, setFavourites] = useState([])
  const dispatch = useDispatch()

  const editFavourite = (rest_id) => {
    dispatch(addFavourites(rest_id))
  }

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </Link>

      <Card.Body>
        <div className='row'>
          <p
            className='col-md-2'
            style={{ color: 'green', cursor: 'pointer' }}
            onClick={() => editFavourite(product._id)}
          >
            <i class='fa-solid fa-heart fa-2xl'></i>
          </p>
        </div>

        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
