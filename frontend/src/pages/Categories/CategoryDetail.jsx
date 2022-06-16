import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material"
import  * as yup from "yup";
import {Link, useNavigate, useParams } from "react-router-dom"
import useRequestResource from '../../hooks/useRequestResource';
import { FormikContext } from 'formik/dist/formik.cjs.production.min';
import ColorPicker from '../../components/ColorPicker';

export default function CategoryDetail() {
    // Post request
    const { addResource, resource, getResource, updateResource } = useRequestResource({endpoint:"categories", resourceLabel:"Category"})
    const navigate = useNavigate()
    
    
    
    const handleSubmit = (values) => {
        console.log(values)
        const formattedValues = {
            name: values.name,
            color: values.color.substring(1)
        }

        if(id){
            updateResource(id, formattedValues, () =>{
                navigate("/categories/")
            })
            return;
        }
        addResource(formattedValues, () => {
           
            navigate("/categories/")
        })
    }
// data form
const validationSchema = yup.object({
    name: yup
      .string('Enter a Category name')
      .max(25,'Name should be of minimum 25 characters lengthl'),
    //   .required('Name is required'),
    color: yup
      .string('Enter a Color name')
      .max(25, 'Color should be of minimum 8 characters length')
      .required('Password is required'),
  });
    
    const formik = useFormik({
         initialValues: {name: resource.name, color:`#${resource.color}`} || {
             name:"",
             color:""
         } ,
        onSubmit: handleSubmit,
        enableReinitialize: true,
        validationSchema: validationSchema
        
    })
// update request
const  {  id }  = useParams()




useEffect(() => {
    if(id){
        getResource(id)

    }},[id])




  return (
     
   <Paper sx={{borderRadius: "2px",
    


    boxShadow: (theme) => theme.shadows[5],
    padding: (theme) => theme.spacing(2,4,3)}}>

        <Typography variant="h6" mb={4}>
               { id ? "Edit Category" : "Create Category"}
        </Typography>
       
           
                    <form onSubmit={formik.handleSubmit} >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField fullWidth id="name" label="Name" name="name"
                                value={ formik.values.name  }
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                 />
                            </Grid>

                            <Grid item xs={12}>
                                {/* <TextField fullWidth id="color" label="Color" name="color"
                                value={  formik.values.color }
                                onChange={formik.handleChange}
                                error={formik.touched.color && Boolean(formik.errors.color)}
                                helperText={formik.touched.color && formik.errors.color} /> */}
                                <ColorPicker id="color" value={formik.values.color}
                                  onChange={(color) => {
                                      formik.setFieldValue("color", color.hex)
                                  }}
                                  error={formik.touched.color && Boolean(formik.errors.color)}
                                  helperText={formik.touched.color && formik.errors.color}
                                />
                            </Grid>

                            <Grid item >
                                <Box sx={{
                                    display: "flex",
                                    margin: (theme) => theme.spacing(1), 
                                    marginTop: (theme) => theme.spacing(3)
                                }}>
                                    <Button component={Link}
                                    to="/categories/"
                                    size="medium"
                                    variant="outlined"
                                    sx={{ mr: 2}}>
                                        Back
                                    </Button>

                                    <Button 
                                    type="submit"
                                    size="medium"
                                    variant="contained"
                                    color="primary">
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>

                        </Grid>
                    </form>
               
            

        
    </Paper>
)}
