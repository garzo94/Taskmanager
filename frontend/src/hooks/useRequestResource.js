import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack"
import formatHttpApiError from "../helpers/formatHttpApiError";
import { LoadingOverlayResourceContext } from "../components/LoadingOverlayResource";
import getCommonOptions from "../helpers/axios/getnCommonOptions";



export default function useRequestResource({ endpoint, resourceLabel }){
    const [resourceList, setresourceList] = useState({
        results: []
    });

    const [resource, setresource] = useState({name:"", color:""})

    // Overlay ###########
    const loadingOverlay = useContext(LoadingOverlayResourceContext);
    const { setLoading } = loadingOverlay

    
// errors #########################
    const {  enqueueSnackbar } = useSnackbar()
    const [error, seterror] = useState(null)


    const handleRequestResourceError = useCallback((err) =>{
        const formattedError = formatHttpApiError(err);
        seterror(formattedError)
        setLoading(false)
        enqueueSnackbar(formattedError)
    }, [enqueueSnackbar, seterror])
    // ################################

    const getResourceList = useCallback(({query=""} = {}) => {
            
            setLoading(true)
         axios.get(`/api/${endpoint}/${query}`, getCommonOptions())
         
           .then((res) => {
                setLoading(false)
                if (res.data.results){
                    setresourceList(res.data);
                }else{
                    setresourceList({
                        results: res.data
                    })
                }
                    
               
               
           }).catch(handleRequestResourceError)
           
    }, [endpoint, handleRequestResourceError, setLoading])

    const addResource = useCallback((values, succesCallback) => {
        setLoading(true)
        axios.post(`/api/${endpoint}/`,values,getCommonOptions())
            .then(() => {
                setLoading(false)
                enqueueSnackbar(`${resourceLabel} added`)
                if (succesCallback){
                    succesCallback()
                }
                
            }).catch(handleRequestResourceError)
    }, [endpoint, enqueueSnackbar, resourceLabel, handleRequestResourceError, setLoading])

    const getResource = useCallback((id) => {
        setLoading(true)
        axios.get(`/api/${endpoint}/${id}`,getCommonOptions())
        .then((res) => {
            const { data } = res
            setresource(data)
            setLoading(false)
        }).catch(handleRequestResourceError)
    },[endpoint, handleRequestResourceError,setLoading])

    const updateResource = useCallback((id, values, succesCallback) => {
        setLoading(true)
        axios.patch(`/api/${endpoint}/${id}/`, values, getCommonOptions())
         
            .then((res) => {
                const updated = res.data;
                const newResourceList = {
                    results: resourceList.results.map((r) => {
                        if (r.id === id){
                            return updated;
                        }
                        return r;
                    }),
                    count: resourceList.count
                }
                setresourceList(newResourceList);
                setLoading(false)
                enqueueSnackbar(`${resourceLabel} updated`)
                if (succesCallback){
                    succesCallback()
                }
                
            }).catch(handleRequestResourceError)
    },[endpoint, enqueueSnackbar, resourceLabel, handleRequestResourceError, setLoading, resourceList])


    const deleteResource = useCallback((id) => {
        setLoading(true)
        axios.delete(`/api/${endpoint}/${id}/`, getCommonOptions())
          .then(() => {
                setLoading(false)
              enqueueSnackbar(`${resourceLabel} deleted`)

            const newResourceList = {
                results: resourceList.results.filter((r) =>{
                    return r.id !== id
                
                })
            } 
            setresourceList(newResourceList)  
            
        
        }).catch(handleRequestResourceError)

        
    },[endpoint, resourceList, enqueueSnackbar], resourceLabel, handleRequestResourceError)

    return {
        resourceList,
        getResourceList,
        addResource,
        getResource,
        resource,
        deleteResource,
        updateResource,
        error
    }
}