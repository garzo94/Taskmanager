

import React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { Box } from "@mui/material";
import Categories from './pages/Categories/index'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CategoryDetail from "./pages/Categories/CategoryDetail"
import { SnackbarProvider } from "notistack"

import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import AuthContextProvider from './contexts/AuthContextProvider';
import RequireAuth from './components/RequireAuth';
import RequireNoteAuth from './components/RequireNoteAuth'
import BaseLayout from './components/BaseLayout'
import TaskDetails from "./Tasks/TasksDetails"
import Tasks from "./Tasks/index"
import Dashboard from "./Dashboard/index"
import RequestResetPassword from './pages/Auth/RequestResetPassword';
import ResetPasswordConfirm from './pages/Auth/ResetPasswordConfirm'
import ThemeModeProvider from './contexts/ThemeModeProvider';

export default function App() {
  return (
    
    <ThemeModeProvider>
        <CssBaseline/>

        {/* <LoadingOverlayResource> */}
          <AuthContextProvider>

              <SnackbarProvider>
            <Router>
              <Box sx={{
                bgcolor: (theme) => theme.palette.background.default,
                minHeight: "100vh",
                width: "100%"
              }}>
                <Routes>
                  <Route element={<RequireAuth/>}>

                    <Route element={<BaseLayout/>}>
                      <Route path="/categories"
                      element = { <Categories />} />
                      <Route path="/categories/create/"
                      element = { <CategoryDetail />} />
                      <Route path={'/categories/edit/:id'}
                      element = {  <CategoryDetail /> }/>
                      <Route path={'/tasks'}
                      element = {  <Tasks /> }/>
                      <Route path={'/tasks/create'}
                      element = {  <TaskDetails /> }/>
                      <Route path={'/tasks/edit/:id'}
                      element = {  <TaskDetails /> }/>
                      <Route path={'/'}
                      element = {  <Dashboard /> }/>
                    </Route>
                    

                  </Route>
                  <Route element={<RequireNoteAuth/>}>
                    <Route path='/auth/signup' 
                    element={<SignUp/>}/>
                    <Route path='/auth/signin' 
                    element={<SignIn/>}/>
                    <Route path='/auth/password-reset' 
                    element={<RequestResetPassword/>}/>
                    <Route path='/auth/password-reset/confirm/:uid/:token' 
                    element={<ResetPasswordConfirm/>}/>
                  </Route>
                  
                  
                </Routes>
                </Box>
            </Router>
              
            </SnackbarProvider>

          </AuthContextProvider>
        

        {/* </LoadingOverlayResource> */}
        
     
        
    </ThemeModeProvider>
  )
}


