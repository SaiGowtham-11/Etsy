import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router'
import Axios from 'axios'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { Image } from 'cloudinary-react'
import { Container } from 'react-bootstrap'

const ProfileScreen = () => {
  const location = useLocation()
  const [userName, setName] = useState('')
  const [userEmailID, setEmail] = useState('')
  const [userPhoneNumber, setPhoneNumber] = useState('')
  const [userDOB, setDOB] = useState('')
  const [userCountry, setUserCountry] = useState('')
  const [userCity, setCity] = useState('')
  const [userZipCode, setUserZipCode] = useState('')
  const [userAbout, setUserAbout] = useState('')
  const [userStreet, setUserStreet] = useState('')
  const [userGender, setuserGender] = useState('')
  const [message, setMessage] = useState(null)
  const [userImage, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.userEmailID) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.userName)
        setEmail(user.userEmailID)
        setPhoneNumber(user.userPhoneNumber)
        setDOB(user.userDateOfBirth)
        setUserStreet(user.userStreet)
        setUserCountry(user.userCountry)
        setUserZipCode(user.userZipCode)
        setCity(user.userCity)
        setUserAbout(user.userAbout)
        setuserGender(user.userGender)
        setImage(user.userImage)
        setImageUrl(user.userImage)
      }
    }
  }, [dispatch, navigate, userInfo, user, loading])
  const uploadImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', userImage)
    formData.append('upload_preset', 'iqtflngo')

    await Axios.post(
      'https://api.cloudinary.com/v1_1/dxfy5z06l/image/upload',
      formData
    ).then((res) => {
      console.log(res.data.secure_url)
      setImageUrl(res.data.secure_url)
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const userobj = {
      userName,
      userEmailID,
      userPhoneNumber,
      userDOB,
      userCountry,
      userCity,
      userZipCode,
      userAbout,
      userStreet,
      imageUrl,
    }
    dispatch(updateUserProfile(userobj))
  }

  return (
    <div className='container update-profile'>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Update Success!</Message>}
      {imageUrl && (
        <Image
          style={{ width: 300, marginBottom: 20 }}
          cloudName='dxfy5z06l'
          public_id={imageUrl}
        />
      )}
      {loading && <Loader></Loader>}
      <form className='form-center' onSubmit={submitHandler}>
        <div className='row py-2'>
          <div className='col-md-9'>
            <div className='row py-2'>
              <div class='col-md-6'>
                <input
                  type='file'
                  className='form-control'
                  name='userName'
                  onChange={(e) => setImage(e.target.files[0])}
                ></input>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 py-2'>
                <button className='btn btn-dark' onClick={uploadImage}>
                  change Photo
                </button>
              </div>
            </div>
            <div className='row py-2'>
              <div class='col-md-2'>
                <label>UserName </label>
              </div>
              <div class='col-md-6'>
                <input
                  type='text'
                  value={userName}
                  className='form-control'
                  name='userName'
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className='row py-2'>
              <div class='col-md-2'>
                <label>Email </label>
              </div>
              <div class='col-md-6'>
                <input
                  type='email'
                  value={userEmailID}
                  className='form-control'
                  name='firstName'
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div className='row py-2'>
              <div class='col-md-2'>
                <label>Phone </label>
              </div>
              <div class='col-md-6'>
                <input
                  type='tel'
                  value={userPhoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='form-control'
                  name='lastName'
                ></input>
              </div>
            </div>
            <div className='row py-2'>
              <div class='col-md-2'>
                <label>Date of Birth </label>
              </div>
              <div class='col-md-6'>
                <input
                  type='date'
                  value={userDOB}
                  onChange={(e) => setDOB(e.target.value)}
                  className='form-control'
                  name='lastName'
                ></input>
              </div>
            </div>
          </div>
        </div>
        <h4> Address</h4>
        <div className='row py-2'>
          <div class='col-md-2'>
            <label>Address Line 1</label>
          </div>
          <div class='col-md-6'>
            <input
              type='text'
              value={userStreet}
              className='form-control'
              name='street'
              required
              onChange={(e) => setUserStreet(e.target.value)}
            ></input>
          </div>
        </div>
        <div className='row py-2'>
          <div class='col-md-2'>
            <label>Country </label>
          </div>
          <div class='col-md-6'>
            <input
              type='text'
              value={userCountry}
              className='form-control'
              name='country'
              required
              onChange={(e) => setUserCountry(e.target.value)}
            ></input>
          </div>
        </div>
        <div className='row py-2'>
          <div class='col-md-2'>
            <label>City </label>
          </div>
          <div class='col-md-6'>
            <input
              type='text'
              value={userCity}
              className='form-control'
              name='country'
              required
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
        </div>
        <div className='row py-2'>
          <div class='col-md-2'>
            <label>ZipCode </label>
          </div>
          <div class='col-md-6'>
            <input
              type='text'
              value={userZipCode}
              className='form-control'
              name='zipcode'
              required
              onChange={(e) => setUserZipCode(e.target.value)}
            ></input>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <button type='submit' className='btn btn-dark'>
              {' '}
              Update Details
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileScreen
