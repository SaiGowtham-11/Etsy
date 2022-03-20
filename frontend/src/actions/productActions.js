import axios from 'axios'

import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

export const listProducts =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const res = await axios.get(`/api/products?keyword=${keyword}`)
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: res.data.result,
      })
    } catch (error) {
      // Need to change
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message,
      })
    }
  }

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const res = await axios.get(`/api/products/${id}`)
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: res.data.result[0],
    })
  } catch (error) {
    // Need to change
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addNewProduct =
  (
    productName,
    productImage,
    productCategory,
    productDescription,
    productQuantity,
    productPrice,
    shopId
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADD_PRODUCT_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
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
          shopId,
        },
        config
      )

      dispatch({
        type: ADD_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
