import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Dropdown,
  Form,
} from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  //const result = await axios.get(`/api/products/${params.id}`)
  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.productImage} alt={product.productName} />
          </Col>
          <Col md={6}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Link to='/shop'>
                  <h4>ShopName</h4>
                </Link>
              </ListGroupItem>
              <ListGroupItem>Sales Count</ListGroupItem>
              <ListGroupItem>
                <h3>{product.productName}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <h3>{product.productPrice}</h3>
                  </Col>
                  <Col>
                    {product.productQuantity > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <h6>{product.productDescription}</h6>
              </ListGroupItem>
              {product.productQuantity > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.productQuantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  className='btn-block productScreenButtons'
                  type='button'
                  disabled={product.productQuantity === 0}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
