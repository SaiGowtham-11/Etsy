import React from 'react'
import { useDispatch, useSelector, UseSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                alt=''
                src='/images/etsyImage.png'
                width='100'
                height='50'
                className='d-inline-block align-top'
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto nav_left_group'>
              <LinkContainer to='/favourites'>
                <Nav.Link className='individual_icons'>
                  <i class='fa-solid fa-heart fa-2xl'></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/shop'>
                <Nav.Link className='individual_icons'>
                  <i class='fa-solid fa-shop fa-xl'></i>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.userName} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='individual_icons'>
                    <i class='fa-solid fa-user fa-xl'></i>
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to='/cart'>
                <Nav.Link className='individual_icons'>
                  <i class='fa-solid fa-cart-shopping fa-xl'></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
