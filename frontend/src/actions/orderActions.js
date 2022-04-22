import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  console.log('In Order Actions')
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const { userLogin } = getState()
    const { userInfo } = userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/orders/add`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
