import React, { useState } from 'react'
import Header from './Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from '../../features/catalog/Catalog';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { ContactPage } from '@mui/icons-material';
import AboutPage from '../../features/about/AboutPage';
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';

export default function App() {
  const [mode, setMode] = useState(false) 
  const displayMode = mode ? 'light' : 'dark'

  const darkTheme = createTheme({
    palette: {
      mode: displayMode
    },
  });

  const handleMode = ()=>setMode(!mode)
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header handleMode={handleMode}/> 
      <Container>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/catalog/:id' element={<ProductDetails/>}/>
      </Routes>         
      </Container>        
    </ThemeProvider>
  )
}
