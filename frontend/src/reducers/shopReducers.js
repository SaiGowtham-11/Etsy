import {
  SHOP_NAME_AVAILABLE_REQUEST,
  SHOP_NAME_AVAILABLE_SUCCESS,
  SHOP_NAME_AVAILABLE_FAIL,
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
} from '../constants/shopConstants'

export const shopNameAvailableReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_NAME_AVAILABLE_REQUEST:
      return { loading: true }
    case SHOP_NAME_AVAILABLE_SUCCESS:
      return { loading: false, shopNameInfo: action.payload }
    case SHOP_NAME_AVAILABLE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createShopReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SHOP_REQUEST:
      return { loading: true }
    case CREATE_SHOP_SUCCESS:
      return { loading: false, shopDetails: action.payload }
    case CREATE_SHOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
