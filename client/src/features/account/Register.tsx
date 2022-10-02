import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { useAppDispatch } from '../../app/store/configureStore';
import { history } from "../..";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const theme = createTheme();

export default function Register() {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid }, } = useForm<{ username: "", email: "", password: "" }>({ mode: "onChange" });

  //setError ระบุค่าผิดพลาดให้แสดงใหม่ ที่ส่งมาจาก API/backend
  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }
  return (
   
      <Container component={Paper}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box
            component="form"
            onSubmit={handleSubmit((data) =>
              agent.Account.register(data)
                .then(() => {
                  toast.success("Registration successful - you can now login");
                  history.push("/login");
                })
                .catch((error) => handleApiErrors(error))
            )}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="User name"
              autoFocus
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                  message: "Not a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[AZ])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                  message: "Password is not complex enough",
                },
              })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>

            </Grid>
          </Box>

        </Box>
      </Container>
 
  );
}