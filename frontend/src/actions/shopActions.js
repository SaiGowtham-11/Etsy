import axios from 'axios'
import {
  SHOP_NAME_AVAILABLE_REQUEST,
  SHOP_NAME_AVAILABLE_SUCCESS,
  SHOP_NAME_AVAILABLE_FAIL,
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
} from '../constants/shopConstants'

export const shopNameAvailableAction = (shopName) => async (dispatch) => {
  try {
    dispatch({
      type: SHOP_NAME_AVAILABLE_REQUEST,
    })

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/shops/checkShop',
      { shopName },
      config
    )

    dispatch({
      type: SHOP_NAME_AVAILABLE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SHOP_NAME_AVAILABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createShopAction =
  (shopName, shopImage, userId) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SHOP_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/shops/addShop',
        { shopName, shopImage, userId },
        config
      )

      dispatch({
        type: CREATE_SHOP_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_SHOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
