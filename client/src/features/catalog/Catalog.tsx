import { Card, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Product } from '../../app/models/Product'
import ProductList from './ProductList'

export default function Catalog() {
  const [products, setProducts]=useState<Product[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/Product")
    .then((response)=>response.json())
    .then((data)=>setProducts(data))
    .catch((error)=>console.log(error))
  },[])
  
  return (
    <>
    <ProductList products={products}/>
    </>
  )
}