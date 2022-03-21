import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import { register } from '../actions/userActions'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Dropdown,
  Form,
} from 'react-bootstrap'
import { Container } from 'react-bootstrap'

const SignUpScreen = () => {
  const location = useLocation()
  const [userName, setName] = useState('')
  const [userEmailID, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (userPassword !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(userName, userEmailID, userPassword))
    }
  }

  return (
    <div>
      <div className='login-container'>
        <div className='logo'></div>
      </div>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <h2>Lets get Started</h2>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-6'>
          <form className='form-center' onSubmit={submitHandler}>
            <div className='form-group'>
              {message && <Message variant='success'> {message}</Message>}
              {error && <Message variant='danger'> {error}</Message>}
              <input
                type='userName'
                className='form-control pad'
                name='username'
                value={userName}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Enter username'
              ></input>
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
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              ></input>
              <input
                type='password'
                name='confirmPassword'
                className='form-control pad'
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
              ></input>
              <div class='d-grid gap-2'>
                <button class='btn btn-secondary' type='submit'>
                  Register
                </button>
              </div>
              <p>
                {' '}
                Have an Account?{' '}
                <span>
                  <Link to='/login'>
                    <a>Login</a>
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

export default SignUpScreen
