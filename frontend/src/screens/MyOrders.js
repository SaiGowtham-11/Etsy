import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { listProducts } from '../actions/productActions'
import { BiZoomIn } from 'react-icons/bi'
import { Modal, Button } from 'react-bootstrap'
const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [orderData, setOrderData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/login'
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productList = useSelector((state) => state.productList)
  const all_productsList = productList.products
  //console.log(all_productsList)
  let products = []
  useEffect(() => {
    if (!userInfo) {
      navigate(redirect)
    }
    getOrders()
    dispatch(listProducts())
  }, [navigate, userInfo, redirect])

  const showModal = async (x) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data: orderDetails } = await axios.get(
      `/api/orders/getOrderDetailsByOrderID/${x.orderID}`,
      config
    )

    let dataObj = {
      order_id: x.orderID,
      cust_id: x.user_id,
      order_date: x.orderDate,
      order_status: x.orderStatus,
      order_total: x.orderTotal,
      order_details: orderDetails.result,
    }
    const modified_order_details = []

    for (let i = 0; i < orderDetails.result.length; i++) {
      //console.log(orderDetails.result[i])
      const prod_id = orderDetails.result[i].products_productID
      var result = all_productsList.find((obj) => {
        return obj.productID === prod_id
      })
      //console.log(result)
      const modified_order_details_obj = {
        prod_id,
        prod_qty: orderDetails.result[i].order_quantity,
        prod_price: orderDetails.result[i].order_price,
        shopID: result.shopID,
        productName: result.productName,
        productImage: result.productImage,
      }
      modified_order_details.push(modified_order_details_obj)
    }
    dataObj.all_order_details = modified_order_details
    //console.log(dataObj)
    setOrderData(dataObj)
    console.log(orderData)
    setModalShow(true)
  }

  const handleClose = () => {
    setModalShow(false)
  }
  const getOrders = async () => {
    if (userInfo) {
      const cust_id = userInfo.user_ID
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/orders/getOrderByCustomer/${cust_id}`,
        config
      )
      console.log(data)
      setMyOrders(data)
    }
  }

  return (
    <div className='container' style={{ marginTop: '5%', marginBottom: '5%' }}>
      {myOrders.length > 0 ? (
        <div>
          <h2>My Purchases</h2>
          {myOrders.map((x) => (
            <>
              <div className='row'>
                <div
                  className='col-md-3'
                  style={{ textTransform: 'capitalize' }}
                >
                  {x._id}
                </div>

                <div className='col-md-3'>
                  ${x.totalPrice} <br />
                  <p
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => showModal(x)}
                  >
                    {' '}
                    View Order Details
                  </p>
                </div>
              </div>
              <hr></hr>
            </>
          ))}
          {modalShow && (
            <>
              <Modal show={modalShow}>
                <Modal.Header>
                  <h3> Order Details</h3>
                  <p style={{ marginLeft: '45%' }}>
                    <Button onClick={() => handleClose}></Button>
                  </p>
                </Modal.Header>
                <Modal.Body>
                  {orderData && (
                    <div className='container'>
                      <div className='row menuItemModal'>
                        <div className='col-7'>
                          <ListGroup variant='flush'>
                            {orderData.all_order_details.map((x) => (
                              <ListGroup.Item>
                                <Row>
                                  <Col>{x.productName}</Col>
                                  <Col>
                                    <Image
                                      src={x.productImage}
                                      alt={x.productName}
                                      fluid
                                      rounded
                                    />
                                  </Col>
                                  <Col>
                                    {x.prod_qty} x ${x.prod_price} = $
                                    {x.prod_qty * x.prod_price}
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                          <hr></hr>
                          <div className='row'>
                            <p>Total: ${orderData.order_total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant='dark' onClick={() => handleClose()}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
      ) : (
        <h2>You don't have any previous orders</h2>
      )}
    </div>
  )
}

export default MyOrders
