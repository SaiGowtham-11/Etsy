import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import products from './products'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const keyword = params.keyword

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products &&
            products.length &&
            products.map((product) => (
              <Col>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
      <Footer />
    </>
  )
}

export default HomeScreen
