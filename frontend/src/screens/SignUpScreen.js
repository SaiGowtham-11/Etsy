import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'
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
  const [nameErr, setNameErr] = useState({})
  const [emailErr, setEmailErr] = useState({})
  const [passwordErr, setPasswordErr] = useState({})

  const [userName, setName] = useState('')
  const [userEmailID, setEmail] = useState('')
  const [userPassword, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const customerSignup = async (e) => {
    e.preventDefault()
    const isValid = true // Need to update the value
    if (isValid) {
      try {
        const response = await Axios.post(`/api/users/UserSignup`, {
          userName: userName,
          userEmailID: userEmailID,
          userPassword: userPassword,
        })
        setMessage(JSON.stringify(response.data.message))
        console.log({ message })
        // if (message.localeCompare('Sign up Sucessfull') == 0) { // take care of this condition
        alert('Sign Up Sucessfull')
        window.open('/LoginScreen', '_self')
        //}
        //console.log(JSON.stringify(response.data.message))
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div>
      <h1 className='form-floating'>User Signup</h1>
      <div className='form-floating'>
        <input
          type='text'
          className='form-control'
          id='floatingName'
          placeholder='John Doe'
          name='userName'
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <label htmlFor='floatingName'>Name</label>
        {Object.keys(nameErr).map((key) => {
          return <div style={{ color: 'red' }}>{nameErr[key]}</div>
        })}
      </div>
      <div className='form-floating form-floating-sm '>
        <input
          type='email'
          className='form-control'
          id='floatingInput'
          placeholder='name@example.com'
          name='userEmailID'
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <label htmlFor='floatingInput'>Email address</label>
        {Object.keys(emailErr).map((key) => {
          return <div style={{ color: 'red' }}>{emailErr[key]}</div>
        })}
      </div>
      <div className='form-floating form-floating-sm'>
        <input
          type='password'
          className='form-control'
          id='floatingPassword'
          placeholder='Password'
          name='userPassword'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <label htmlFor='floatingPassword'>Password</label>
        {Object.keys(passwordErr).map((key) => {
          return <div style={{ color: 'red' }}>{passwordErr[key]}</div>
        })}
      </div>
      <div className='d-grid gap-2 form-floating form-floating-sm'>
        <button
          onClick={customerSignup}
          type='button'
          className='btn btn-outline-primary'
        >
          SUBMIT
        </button>
      </div>
      <div>{message}</div>
    </div>
  )
}

export default SignUpScreen
