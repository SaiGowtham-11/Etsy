import React, { useState, useEffect, useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { shopNameAvailableAction } from '../actions/shopActions'

const ShopAvailableScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [newShopName, setNewShopName] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const shopInfo = useSelector((state) => state.shopInfo)
  //const { shopName } = shopInfo

  /*useEffect( () => {
        if(shopInfo){
            navigate(redirect)
        }
    }, [navigate, redirect])*/

  const checkShopNameAvailability = (e) => {
    e.preventDefault()
    dispatch(shopNameAvailableAction(newShopName))
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
          value={newShopName}
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
      <p align='center'>
        Your shop name will appear in your shop and next to each of your
        listings throughout Etsy. After your open your shop, you can change your
        name once. Here are some tips for picking a shop name
      </p>
    </>
  )
}

export default ShopAvailableScreen
