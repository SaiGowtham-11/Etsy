import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import { register } from '../actions/userActions'
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
import { Container } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [street, setStreet] = useState(userInfo.userStreet)
  const [city, setCity] = useState(userInfo.userCity)
  const [zipcode, setZipcode] = useState(userInfo.userZipCode)
  const [country, setCountry] = useState(userInfo.userCountry)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ street, city, zipcode, country }))
    navigate('/payment')
  }

  return (
    <Form onSubmit={submitHandler}>
      <h1>Shipping</h1>
      <Form.Group controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter address'
          value={street}
          required
          onChange={(e) => setStreet(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='city'>
        <Form.Label>City</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter city'
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='postalCode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter postal code'
          value={zipcode}
          required
          onChange={(e) => setZipcode(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter country'
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </Form>
  )
}

export default ShippingScreen
