import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Formik } from 'formik'
import * as yup from "yup"
import useRequestAuth from '../../hooks/useRequestAuth';
import { Link, Navigate } from "react-router-dom"

const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    email: yup.string().email("Please provide a valid email").required('Email is required')
})





export default function SignUp() {
    
  const {register, loading } = useRequestAuth();
  const navigate = Navigate()
  const handleSubmit = (values) => {
    register(values, () =>{
      navigate("/auth/signin")
    })
  };

  return (
    
      <Container component="main" maxWidth="xs">
        
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
            Sign up
          </Typography>
         <Formik validationSchema={validationSchema} onSubmit={handleSubmit} validationOnBlur={false} initialValues={{
            email:'',
            username:'',
            password:''
         }}>
            {(formik) => {
                return(
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
        
                    <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="Username"
                          label="Username"
                          name="username"
                          {...formik.getFieldProps("username")}
                          errors={formik.touched.username && Boolean(formik.errors.username)}
                          helperText={formik.touched.username && formik.errors.username}
                          
                        />
                      </Grid>
                     
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          {...formik.getFieldProps("email")}
                          errors={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"{...formik.getFieldProps("password")}
                          errors={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        
                      </Grid>
                    </Grid>
                    <LoadingButton 
                      type="submit"
                      fullWidth
                      variant="contained"
                      loading={loading}
                      sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to='/auth/signin' key="signin">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                )
            }}
         </Formik>
        </Box>
       
      </Container>
    
  );

}