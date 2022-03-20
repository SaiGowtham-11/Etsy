import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { getFavourites, getUserDetails } from '../actions/userActions'
import { listProducts } from '../actions/productActions'

const MyFavourites = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    alert('Hiiiii')
    console.log('Hiiiii')
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(getFavourites())
    dispatch(listProducts())
  }, [dispatch])
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const Fauvourites = useSelector((state) => state.userGetFavourites)
  console.log(Fauvourites)
  const {
    loading: restDetailsLoading,
    error: restDetailsError,
    favourites: favouritesFromState,
  } = Fauvourites

  const productList = useSelector((state) => state.productList)
  const all_productsList = productList.products
  console.log(favouritesFromState)
  let modified_order_details = []
  if (favouritesFromState.result.length !== 0) {
    let result_temp = favouritesFromState.result
    for (let i = 0; i < result_temp.length; i++) {
      const prod_id = result_temp[i].product_id
      var result = all_productsList.find((obj) => {
        return obj.productID === prod_id
      })
      console.log(result)
      const modified_order_details_obj = {
        prod_id,
        //shopID: result.shopID,
        productName: result.productName,
        productImage: result.productImage,
      }
      modified_order_details.push(modified_order_details_obj)
    }
  }

  //console.log(modified_order_details)

  return (
    <div>
      {modified_order_details.length > 0 ? (
        <div>
          <h2>My Favorites</h2>
          {modified_order_details.map((x) => (
            <Card className='my-3 p-3 rounded'>
              <Link to={`/product/${x.prod_id}`}>
                <Card.Img variant='top' src={x.productImage} />
              </Link>

              <Card.Body>
                <Link to={`/product/${x.prod_id}`}>
                  <Card.Title as='div'>
                    <strong>{x.productName}</strong>
                  </Card.Title>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <h2>You don't have any Favourites</h2>
      )}
    </div>
  )
}

export default MyFavourites
