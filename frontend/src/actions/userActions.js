import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST } from '../constants/userConstants'

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
      type: USER_LOGIN_REQUEST,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    })
  }
}
