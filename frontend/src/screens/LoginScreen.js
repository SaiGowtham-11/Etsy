import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router'
import { login } from '../actions/userActions'
import Axios from 'axios'

const LoginScreen = ({ location, history }) => {
  //const location = useLocation()
  const [userEmailID, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(userEmailID, userPassword))
  }

  const customerSignup = async (e) => {
    // e.preventDefault()
    // const isValid = true // Need to update the value
    // if (isValid) {
    //   try {
    //     const response = await Axios.post(`/api/users/UserLogin`, {
    //       userEmailID: userEmailID,
    //       userPassword: userPassword,
    //     })
    //     setMessage(JSON.stringify(response.data.message))
    //     console.log('+++++++++++++++++++')
    //     console.log({ message })
    //     // if (message.localeCompare('Sign up Sucessfull') == 0) { // take care of this condition
    //     alert('Sign Up Sucessfull')
    //     window.open('/LoginScreen', '_self')
    //     //}
    //     //console.log(JSON.stringify(response.data.message))
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
  }

  return (
    <div>
      <div className='login-container'>
        <div className='logo'>
          <h1>Etsy</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <h2>Welcome back</h2>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-6'>
          <form className='form-center' onSubmit={submitHandler}>
            <div className='form-group'>
              <label> Sign in with your email address</label>
              {error && <Message variant='danger'> {error}</Message>}
              <input
                type='email'
                className='form-control pad'
                name='email'
                value={userEmailID}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Enter Your Email'
              ></input>
              <input
                type='password'
                name='password'
                className='form-control pad'
                vlaue={userPassword}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              ></input>
              <div class='d-grid gap-2'>
                <button class='btn btn-secondary' type='submit'>
                  Sign In
                </button>
              </div>
              <p>
                {' '}
                New to ETSY?{' '}
                <span>
                  <Link to='/signup'>
                    <a>Create an account</a>
                  </Link>
                </span>{' '}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
