import React, { useState, useEffect, useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import { shopDetailsAction } from '../actions/shopActions'
import { Modal, Button } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
const ShopProfileScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [shopName, setshopName] = useState('')
  const [shopID, setshopID] = useState('')
  const [shopImage, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const [productName, setProductName] = useState('')
  const [message, setMessage] = useState('')
  const [shopProducts, setShowProducts] = useState()

  const [productCategory, setProductCategory] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [productPrice, setproductPrice] = useState('')

  const [productImage, setProductImage] = useState('')
  const [productImageUrl, setProductImageUrl] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = userLogin
  let userId = userInfo._id

  const productList = useSelector((state) => state.productList)
  const all_productsList = productList.products

  console.log(all_productsList)
  const shopDetails = useSelector((state) => state.shopDetails)
  const { shopInfo } = shopDetails
  console.log(shopInfo)
  useEffect(() => {
    if (!shopInfo) {
      dispatch(shopDetailsAction(userId))
    } else {
      setshopName(shopInfo.shopName)
      setshopID(shopInfo.shopID)
      setImage(shopInfo.shopImage)
      setImageUrl(shopInfo.shopImage)
    }
    if (shopID) getProductsbyshopId()
  }, [dispatch, navigate, shopInfo, shopID])

  const getProductsbyshopId = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // api/products/getProductsbyShopID/5
    const url = `api/products/getProductsbyShopID/${shopID}`
    console.log(url)
    const { data } = await axios.get(url)
    console.log(data)
    setShowProducts(data)
  }

  //console.log(shopProducts)
  const submitHandler = (e) => {
    e.preventDefault()

    addProduct()
  }
  const handleClose = () => {
    setModalShow(false)
  }
  const showModal = () => {
    setModalShow(true)
  }
  const addProduct = async () => {
    if (userInfo) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        '/api/products/addProduct',
        {
          productName,
          productImage,
          productCategory,
          productDescription,
          productQuantity,
          productPrice,
          shopID,
        },
        config
      )
      setMessage(data.message)
    }
  }
  const uploadImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', productImage)
    formData.append('upload_preset', 'iqtflngo')

    await axios
      .post('https://api.cloudinary.com/v1_1/dxfy5z06l/image/upload', formData)
      .then((res) => {
        setProductImageUrl(res.data.secure_url)
        setProductImage(res.data.secure_url)
      })
  }

  const modified_order_details = []

  return (
    <div>
      <h1>Shop Name:{shopName}</h1>
      <h2>ShopID : {shopID}</h2>
      <div className='container update-profile'>
        {imageUrl && (
          <Image
            style={{ width: 300, marginBottom: 20 }}
            cloudName='dxfy5z06l'
            public_id={imageUrl}
          />
        )}
        {modalShow && (
          <>
            <Modal show={modalShow}>
              <Modal.Header>
                <h3> Add Product</h3>
                <p style={{ marginLeft: '45%' }}>
                  <Button onClick={() => handleClose}></Button>
                </p>
              </Modal.Header>
              <Modal.Body>
                {message && <Message variant='success'>{message}</Message>}
                {productImageUrl && (
                  <Image
                    style={{ width: 300, marginBottom: 20 }}
                    cloudName='dxfy5z06l'
                    public_id={productImageUrl}
                  />
                )}
                <form className='form-center' onSubmit={submitHandler}>
                  <div className='row py-2'>
                    <div className='col-md-9'>
                      <div className='row py-2'>
                        <div class='col-md-6'>
                          <input
                            type='file'
                            className='form-control'
                            name='userName'
                            onChange={(e) => setProductImage(e.target.files[0])}
                          ></input>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-4 py-2'>
                          <button
                            className='btn btn-dark'
                            onClick={uploadImage}
                          >
                            Upload Photo
                          </button>
                        </div>
                      </div>
                      <div className='row py-2'>
                        <div class='col-md-2'>
                          <label>Product Name </label>
                        </div>
                        <div class='col-md-6'>
                          <input
                            type='text'
                            value={productName}
                            className='form-control'
                            name='userName'
                            onChange={(e) => setProductName(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className='row py-2'>
                        <div class='col-md-2'>
                          <label>Product Category </label>
                        </div>
                        <div class='col-md-6'>
                          <input
                            type='text'
                            value={productCategory}
                            className='form-control'
                            name='firstName'
                            onChange={(e) => setProductCategory(e.target.value)}
                          ></input>
                        </div>
                      </div>
                      <div className='row py-2'>
                        <div class='col-md-2'>
                          <label>Product Description </label>
                        </div>
                        <div class='col-md-6'>
                          <input
                            type='text'
                            value={productDescription}
                            onChange={(e) =>
                              setProductDescription(e.target.value)
                            }
                            className='form-control'
                            name='lastName'
                          ></input>
                        </div>
                      </div>

                      <div className='row py-2'>
                        <div class='col-md-2'>
                          <label>Product Quantity</label>
                        </div>
                        <div class='col-md-6'>
                          <input
                            type='number'
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            className='form-control'
                            name='lastName'
                          ></input>
                        </div>
                      </div>
                      <div className='row py-2'>
                        <div class='col-md-2'>
                          <label>Product Price</label>
                        </div>
                        <div class='col-md-6'>
                          <input
                            type='number'
                            step='0.01'
                            value={productPrice}
                            onChange={(e) => setproductPrice(e.target.value)}
                            className='form-control'
                            name='lastName'
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type='submit'>add product</button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='dark' onClick={() => handleClose()}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
        <div>
          <button onClick={() => showModal()}> Add Product</button>
        </div>
        {shopProducts ? (
          <div>
            <p> {/*shopProducts.result[0].productName*/}</p>
            <h2>Shop Items</h2>
            {shopProducts.result.map((x) => (
              <Card className='rounded'>
                <Link to={`/product/${x.prod_id}`}>
                  <Card.Img
                    variant='top'
                    src={x.productImage}
                    width='100'
                    height='510'
                  />
                </Link>
                <Card.Body>
                  <Link to={`/product/${x.prod_id}`}>
                    <Card.Title as='div'>
                      <strong>{x.productName}</strong>
                    </Card.Title>
                    <Card.Title as='div'>
                      <strong>Product Price : {x.productPrice}</strong>
                    </Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <h2>This Shop has no Products</h2>
        )}
      </div>
    </div>
  )
}

export default ShopProfileScreen
