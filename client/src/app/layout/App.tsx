import React, { useState } from 'react'
import Header from './Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Catalog from '../../features/catalog/Catalog';
import Container from '@mui/material/Container';

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
       <Catalog/>   
      </Container>        
    </ThemeProvider>
  )
}
