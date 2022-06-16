import { useCallback, useState, useContext } from 'react'
import axios from "axios"
import { useSnackbar } from 'notistack'
import formatHttpApiError from '../helpers/formatHttpApiError'
import { AuthContext } from '../contexts/AuthContextProvider'
import getCommonOptions from '../helpers/axios/getnCommonOptions'
import { DataObject } from '@mui/icons-material'


export default function useRequestAuth() {
    const [loading, setLoading] = useState(false);
    const [logoutPending, setLogoutPending] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(null);
    const { setIsAuthenticated } = useContext(AuthContext)

    const handleRequestError = useCallback((err) =>{
        const formattedError = formatHttpApiError(err);
        setError(formattedError);
        enqueueSnackbar(formattedError)
        setLoading(false)
    },[enqueueSnackbar, setLoading, setError]) 

    const RequestResetPassword = useCallback((email, gRecaptchaRes) =>{
        setLoading(true)
        axios.post('/api/auth/users/reset_password/', {email, g_recaptcha_response: gRecaptchaRes})
          .then(()=>{
            setLoading(false)
            enqueueSnackbar("Reset password link will be sent to the provide email")
            
          }). catch(handleRequestError)
    },[enqueueSnackbar, handleRequestError]) 

    const resetPassword = useCallback((data, succesCallback)=>{
      setLoading(true)
      axios.post('/api/auth/users/reset_password_confirm/', data)
         .then(()=>{
            enqueueSnackbar("Succesfully updated password")
            setLoading(false);
            if(succesCallback){
                succesCallback()
            }
         }).catch(handleRequestError)
    },[enqueueSnackbar, handleRequestError, setLoading])

    const register = useCallback(({username, email, password}, succesCallback) => {
        setLoading(true);
        axios.post("/api/auth/users/", {username, email, password})
           .then(()=>{
            enqueueSnackbar("Sign up is succesful, you can sign in with your credentials");
            setLoading(false);
            if (succesCallback){
                succesCallback();
            }
           }).catch(handleRequestError)
    },  [enqueueSnackbar, handleRequestError, setLoading])

    const login = useCallback(({username, password}, successCallback)=>{
        setLoading(true);
        axios.post("/api/auth/token/login/",{username, password})
          .then((res)=>{
            const {auth_token} = res.data;
            localStorage.setItem("authToken", auth_token);
            setLoading(false)
            setIsAuthenticated(true)
            if(successCallback){
                successCallback();
            }
          }).catch(handleRequestError)
    }, [handleRequestError, setLoading, setIsAuthenticated])

    const logout = useCallback(() =>{
        setLogoutPending(true)
        axios.post("/api/auth/token/logout/", null, getCommonOptions())
           .then(()=>{
            localStorage.removeItem("authToken")
            setLogoutPending(false);
            setIsAuthenticated(false)
           }).catch((err) =>{
            setLogoutPending(false)
            handleRequestError(err)
           })
    },[handleRequestError, setLogoutPending, setIsAuthenticated])

    return {
        register,
        loading,
        error,
        login,
        logout,
        logoutPending,
        RequestResetPassword,
        resetPassword
    }
}
