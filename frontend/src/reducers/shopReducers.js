import {
  SHOP_NAME_AVAILABLE_REQUEST,
  SHOP_NAME_AVAILABLE_SUCCESS,
  SHOP_NAME_AVAILABLE_FAIL,
  CREATE_SHOP_REQUEST,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_DETAILS_FAIL,
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

export const shopDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true }
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, shopInfo: action.payload }
    case SHOP_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
