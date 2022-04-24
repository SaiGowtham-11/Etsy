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
const MyFav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const Fauvourites = useSelector((state) => state.userGetFavourites)
  const {
    loading: restDetailsLoading,
    error: restDetailsError,
    favourites: favouritesFromState,
  } = Fauvourites
  const productList = useSelector((state) => state.productList)
  const all_productsList = productList.products
  let modified_order_details = []
  if (favouritesFromState.result && favouritesFromState.length !== 0) {
    let result_temp = favouritesFromState

    const prod_id = result_temp.result[0]
    console.log(prod_id)
    var result = all_productsList.find((obj) => {
      return obj._id === prod_id
    })
    const modified_order_details_obj = {
      prod_id,
      //shopID: result.shopID,
      productName: result.name,
      productImage: result.image,
    }
    modified_order_details.push(modified_order_details_obj)

    console.log(modified_order_details)
  }
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(listProducts())
    dispatch(getFavourites())
  }, [dispatch])
  return (
    <div>
      {modified_order_details ? (
        <div>
          <h2>My Favorites</h2>
          {modified_order_details.map((x) => (
            <Card className='my-3 p-3 rounded' style={{ width: '18rem' }}>
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

export default MyFav
