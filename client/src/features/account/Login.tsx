import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper, TextField } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";
import { signInUser } from './accountSlice';
import { useAppDispatch } from '../../app/store/configureStore';
import { history } from "../..";

export default function Login() {

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<{ username: ""; password: "" }>({ mode: "all" });

  //FieldValues คือ ค่าทั้งหมดภายใน Form
  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      history.push("/catalog"); //มาจาก index.tsx
    } catch (error) {
      console.log(error)
    }
  }

  //FieldValues คือ ค่าทั้งหมดภายใน Form
  // async function submitForm(data: FieldValues) {
  //   try {
  //   await agent.Account.login(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <Container component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        mt: 5
      }}>

      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>

          {/* User Name */}
          <TextField
            margin="normal"
            fullWidth
            label="User name"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message}
          />

          {/* Password */}
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </LoadingButton>

          <Grid container>
            <Grid item>
              <Link to="/register" style={{color:'Highlight'}}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>

        </Box>
      </Box>

    </Container>

  );
}