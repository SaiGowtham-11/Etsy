import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card, Pagination, Form } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { listProducts } from '../actions/productActions'
import { Modal, Button } from 'react-bootstrap'
import Paginate from "../components/Paginate";
import ReactPaginate from "react-paginate";

const MyOrders = ({match}) => {
  //const [myOrders, setMyOrders] = useState([])
  //const pageNumber = match.params.pageNumber || 1
  const [pageSize,setPageSize]=useState(2);
  const [pageNumber,setPageNumber] = useState(1) ;
  const [pageOffset,setPageOffset] = useState(1) ;

  const [loading,setLoading]=useState(false);
  //set the page numbers

  //data diplayed per page
  const [dataPerPage,setDataPerPage] = useState(5) ;

  const [orders, setMyOrders] = useState([])
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
    getOrders(pageNumber, pageSize)
    dispatch(listProducts())
  }, [navigate, userInfo, redirect, dispatch, pageNumber, pageSize])

  const showModal = async (x) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data: orderDetails } = await axios.get(
      `/api/orders/getOrderDetailsByOrderID/${x._id}`,
      config
    )

    let dataObj = {
      order_id: orderDetails._id,
      cust_id: orderDetails.user,
      order_date: orderDetails.createdAt,
      order_status: 'Success',
      order_total: orderDetails.totalPrice,
      order_details: orderDetails.orderItems,
    }
    const modified_order_details = []

    for (let i = 0; i < orderDetails.orderItems.length; i++) {
      //console.log(orderDetails.result[i])
      const prod_id = orderDetails.orderItems[i].product
      var result = all_productsList.find((obj) => {
        return obj._id === prod_id
      })
      //console.log(result)
      const modified_order_details_obj = {
        prod_id,
        prod_qty: orderDetails.orderItems[i].qty,
        prod_price: orderDetails.orderItems[i].price,
        shopID: orderDetails.orderItems[i]._id,
        productName: orderDetails.orderItems[i].name,
        productImage: orderDetails.orderItems[i].image,
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
  const paginate = (e)=>{
    //alert(e)
    //setPageNumber(e.target.value)

    setPageSize(e)
    getOrders(pageNumber,pageSize)
  }

  const Navigate = async(e)=>{
   // alert("hi")
    const userId = userInfo.user_ID
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
        `/api/orders/getOrderByCustomer/${userId}/?pageSize=${pageSize}&page=${pageNumber}`,
        config
    )
    if (e=== 'prev'){
      setPageOffset(pageOffset-1)
      const start = pageOffset*pageNumber;
      const end = start-pageNumber;
      let updatedData = data.slice(start,end)
      console.log(updatedData)
      setMyOrders(updatedData)

    }
    else{
      setPageOffset(pageOffset+1)
      const start = pageOffset*pageNumber;
      const end = start+pageNumber+1;
      let updatedData = data.slice(start,end)
      console.log(updatedData)
      setMyOrders(updatedData)

    }
  }
  const getOrders = async (pageNumber, pageSize) => {
    if (userInfo) {
      const userId = userInfo.user_ID
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/orders/getOrderByCustomer/${userId}/?pageSize=${pageSize}&page=${pageNumber}`,
        config
      )

      if(data.length > pageSize){
        let updatedData = data.slice(0,pageSize)
        //console.log(updatedData)
        setMyOrders(updatedData)
      }
      //console.log(data)
      else{
        setMyOrders(data)
        console.log(orders.length)
      }

    }
  }




  return (
      <>
        <Row>
          <h3> Your Orders </h3>
          <Form>
            <Form.Group controlId='orderStatus'>
              <Form.Control as='select' value={pageSize} onChange={x => paginate(x.target.value)}>
                <option value='2'>2</option>
                <option value='5'>5</option>
                <option value='10'>10</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Row>
        <div className='container' style={{ marginTop: '5%', marginBottom: '5%' }}>
          {orders.length > 0 ? (
              <div>
                <h2>My Purchases</h2>
                {orders.map((x) => (
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
        <div style={{textAlign:"center",color:"#89B5AF"}}>
          <Button onClick={(e)=>Navigate(e.target.value)}
              variant="primary"
              value="prev"
          >
            Previous
          </Button>
          <Button onClick={(e)=>Navigate(e.target.value)}
              variant="primary"
              value = "next"
          >
            Next
          </Button>
        </div>
      </>

  )
}

export default MyOrders
