import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import { Product } from '../../app/models/Product'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, setBasket } from '../basket/basketSlice';

interface Props{
  product : Product
}

export default function ProductCard({product} : Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch()

  return (
    <div>
      <Card sx={{ maxWidth: '100%', mt: 3 }}>
      
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {product.name.at(0)?.toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.pictureUrl}
          subheader={product.name}
        />

    <CardMedia
      component="img"
      height="200"
      // image={`https://picsum.photos/200/300?${Math.random()}`}
      sx={{backgroundSize:"container",bgcolor:'#FFFFCC'}}
      image={product.pictureUrl}
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {(product.price/100).toFixed(1)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.brand}/{product.type}
      </Typography>
    </CardContent>
    <CardActions>
      <LoadingButton size="small" loading={status === "pendingAddItem" + product.id} onClick={()=>dispatch(addBasketItemAsync({ productId: product.id }))}>Add to cart</LoadingButton>
      <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
    </CardActions>
  </Card></div>
  )
}
