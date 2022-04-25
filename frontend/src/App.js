import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import CartScreen from './screens/CartScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import MyOrders from './screens/MyOrders'
import MyFav from './screens/MyFav'
import ShopAvailableScreen from './screens/ShopAvailableScreen'
import ShopProfileScreen from './screens/ShopProfileScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container className='EntryMessage'>
          <Routes>
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/signup' element={<SignUpScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/cart'>
              <Route path=':id' element={<CartScreen />} />
              <Route path='' element={<CartScreen />} />
            </Route>
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/myOrders' element={<MyOrders />} />
            <Route path='/favourites' element={<MyFav />} />
            <Route path='/shop' element={<ShopAvailableScreen />} />
            <Route path='/shopProfile' element={<ShopProfileScreen />} />
            <Route path='/myOrders/:pageNumber' component={MyOrders} exact/>
          </Routes>
        </Container>
      </main>
    </Router>
  )
}

export default App
