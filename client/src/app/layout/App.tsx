import React, { useCallback, useEffect, useState } from 'react'
import Header from './Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from '../../features/catalog/Catalog';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';

import AboutPage from '../../features/about/AboutPage';
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';
import NotFound from '../errors/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import LoadingComponent from './LoadingComponent';
import BasketPage from '../../features/basket/BasketPage';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import ContactPage from '../../features/contact/ContactPage';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchBasketAsync } from '../../features/basket/basketSlice';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { PrivateLogin, PrivateRoute } from './PrivateRoute';
import OrderPage from '../../features/orders/OrderPage';

export default function App() {
  // const { setBasket } = useStoreContext(); //ควบคุมสเตทด้วย React context to Centralize
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true);
  const { fullscreen } = useAppSelector(state => state.screen)

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [mode, setMode] = useState(false)
  const displayMode = mode ? 'light' : 'dark'

  const darkTheme = createTheme({
    palette: {
      mode: displayMode
    },
  });

  const handleMode = () => setMode(!mode)

  if (loading) return <LoadingComponent message="Initilize App....." />;

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          autoClose={100}
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <CssBaseline />
        <Header handleMode={handleMode} />
        {fullscreen ? <>{mainroute}</> : <Container>{mainroute}</Container>}
      </ThemeProvider>
    </>
  )
}

const mainroute = (<Routes>
  <Route path='/' element={<HomePage />} />
  <Route path='/about' element={<AboutPage />} />
  <Route path='/contact' element={<ContactPage />} />
  <Route path='/catalog' element={<Catalog />} />
  <Route path='/catalog/:id' element={<ProductDetails />} />
  <Route path='/server-error' element={<ServerError />} />
  <Route path="/basket" element={<BasketPage />} />
  <Route path="/checkout" element={< CheckoutPage />} />

  <Route
    path="/login"
    element={
      <PrivateLogin>
        <Login />
      </PrivateLogin>
    }
  />
  <Route element={<PrivateRoute />}>
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/order" element={<OrderPage/>}/>
  </Route>

  <Route path="/register" element={<Register />} />
  <Route path='*' element={<NotFound />} />
</Routes>)