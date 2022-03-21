import React, { useState, useEffect, useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import {
  shopNameAvailableAction,
  shopDetailsAction,
  createShopAction,
} from '../actions/shopActions'
import Axios from 'axios'
import { Image } from 'cloudinary-react'

const ShopAvailableScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [shopImage, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = userLogin
  let userId = userInfo._id

  const [shopName, setNewShopName] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const shopDetails = useSelector((state) => state.shopDetails)
  const { shopInfo } = shopDetails

  const shopNameAvailable = useSelector((state) => state.shopNameAvailable)
  const { shopNameInfo } = shopNameAvailable

  useEffect(() => {
    dispatch(shopDetailsAction(userId))
    if (shopInfo) {
      navigate('/shopProfile')
    }
  }, [dispatch, navigate, shopInfo])

  const checkShopNameAvailability = (e) => {
    e.preventDefault()
    dispatch(shopNameAvailableAction(shopName))
    dispatch(shopDetailsAction())
  }

  const createShop = (e) => {
    e.preventDefault()
    dispatch(createShopAction(shopName, shopImage, userId))
    dispatch(shopDetailsAction(userId))
    if (shopInfo.length !== 0) {
      navigate('/shopProfile')
    }
  }
  const uploadImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', shopImage)
    formData.append('upload_preset', 'iqtflngo')

    await Axios.post(
      'https://api.cloudinary.com/v1_1/dxfy5z06l/image/upload',
      formData
    ).then((res) => {
      setImage(res.data.secure_url)
      setImageUrl(res.data.secure_url)
    })
  }

  return (
    <>
      <h2 align='center'>Name your Shop</h2>
      <h3 align='center'>Choose a memorable name that reflects your style</h3>

      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter your Shop Name'
          aria-label='Give your Shop Name'
          aria-describedby='basic-addon2'
          name='shopNameAvailable'
          value={shopName}
          onChange={(e) => setNewShopName(e.target.value)}
        />
        <div className='input-group-append'>
          <button
            className='btn btn-outline-dark'
            type='button'
            onClick={checkShopNameAvailability}
          >
            <b>Check Availability</b>
          </button>
        </div>
      </div>
      {shopNameInfo && shopNameInfo.message && (
        <div>
          <Message variant='success'>{shopNameInfo.message}</Message>

          <button
            className='btn btn-outline-primary'
            type='button'
            onClick={createShop}
          >
            <b>Create Shop</b>
          </button>
        </div>
      )}
      <p align='center'>
        Your shop name will appear in your shop and next to each of your
        listings throughout Etsy. After your open your shop, you can change your
        name once. Here are some tips for picking a shop name
      </p>
      <div>
        {imageUrl && (
          <Image
            style={{ width: 300, marginBottom: 20 }}
            cloudName='dxfy5z06l'
            public_id={imageUrl}
          />
        )}
        <form className='form-center' onSubmit={createShop}>
          <div className='row py-2'>
            <div className='col-md-9'>
              <div className='row py-2'>
                <div class='col-md-6'>
                  <input
                    type='file'
                    className='form-control'
                    name='userName'
                    onChange={(e) => setImage(e.target.files[0])}
                  ></input>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4 py-2'>
                  <button className='btn btn-dark' onClick={uploadImage}>
                    Upload Photo
                  </button>
                </div>
              </div>
              <div className='row py-2'>
                <div class='col-md-2'>
                  <label>ShopName </label>
                </div>
                <div class='col-md-6'>
                  <input
                    type='text'
                    value={shopName}
                    className='form-control'
                    name='userName'
                    onChange={(e) => setNewShopName(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <button type='submit' className='btn btn-dark'>
                {' '}
                Register Shop
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ShopAvailableScreen
