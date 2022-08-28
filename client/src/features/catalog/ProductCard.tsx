import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader, IconButton } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import { Product } from '../../app/models/Product'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

interface Props{
  product : Product
}

export default function ProductCard({product} : Props) {
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
      height="500"
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
      <Button size="small">Add to Cart</Button>
      <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
    </CardActions>
  </Card></div>
  )
}
