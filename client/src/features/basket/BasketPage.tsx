import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useStoreContext } from '../../app/context/StoreContext';
import { Box, Button, Grid } from '@mui/material';
import { currencyFormat } from '../../app/util/Util';
import { LoadingButton } from '@mui/lab';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useState } from 'react';
import agent from '../../app/api/agent';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';

export default function BasketPage() {

  //name ใช้ควบคุม LoadingButton ให้หมุนเพียงจุดเดียว ณ เวลําใดเวลําหนึ่ง
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const { basket, setBasket, removeItem } = useStoreContext();

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name: name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="left">Subtotal</TableCell>
              <TableCell align="left"></TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box>
                    <img src={item.pictureUrl} alt={item.name} width='100' />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price)}</TableCell>

                <TableCell align="center">
                  <LoadingButton loading={status.loading && status.name === "remove" + item.productId.toString()} onClick={() => handleRemoveItem(item.productId, 1, "remove" + item.productId.toString())}>
                    <Remove />
                  </LoadingButton>

                  {item.quantity}

                  <LoadingButton loading={status.loading && status.name === "add" + item.productId.toString()} onClick={() => handleAddItem(item.productId, "add" + item.productId.toString())}>
                    <Add />
                  </LoadingButton>
                </TableCell>

                <TableCell align="left">{currencyFormat(item.quantity * item.price)}</TableCell>

                <TableCell>
                  <LoadingButton loading={status.loading && status.name === "del" + item.productId.toString()} onClick={() => handleRemoveItem(item.productId, item.quantity, "del" + item.productId.toString())}>
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>

    </>
  );
}
