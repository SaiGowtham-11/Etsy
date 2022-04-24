import axios from 'axios'
import {
  USER_ADD_FAV_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_EDIT_FAV_FAIL,
  USER_EDIT_FAV_SUCCESS,
  USER_GET_FAV_FAIL,
  USER_GET_FAV_REQUEST,
  USER_GET_FAV_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'

export const login = (userEmailID, userPassword) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/UserLogin',
      {
        userEmailID,
        userPassword,
      },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  //localStorage.removeItem('shippingAddress')
  //localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  //dispatch({ type: USER_DETAILS_RESET })
  //dispatch({ type: ORDER_LIST_MY_RESET })
  //dispatch({ type: USER_LIST_RESET })
  document.location.href = '/login'
}

export const register =
  (userName, userEmailID, userPassword) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      const config = {
        Headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/api/users/UserSignup',
        {
          userName,
          userEmailID,
          userPassword,
        },
        config
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const { userLogin } = getState()
    const { userInfo } = userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, user, config)
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  console.log(id)
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const { userLogin } = getState()
    const { userInfo } = userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/users/${id}/${userInfo.user_ID}`,
      config
    )
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addFavourites = (prod_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_FAV_REQUEST,
    })

    const { userLogin } = getState()
    const { userInfo } = userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const uri = `/api/users/addfavourite/${userInfo.user_ID}/${prod_id}`
    const { data } = await axios.get(uri, config)
    dispatch({
      type: USER_EDIT_FAV_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getFavourites = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_FAV_REQUEST,
    })

    const { userLogin } = getState()
    const { userInfo } = userLogin
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const userID = userInfo.user_ID
    const { data } = await axios.get(
      `/api/users/getFauvourites/${userID}`,
      config
    )
    dispatch({
      type: USER_GET_FAV_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_GET_FAV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
