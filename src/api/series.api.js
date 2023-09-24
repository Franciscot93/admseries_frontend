import axios from 'axios'

export const getSeriesRequest=async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/series`)
    return data
}

export const createSerieRequest= async(serie)=>
{
   await axios.post(`${import.meta.env.VITE_API_URL}/api/series`,serie)
}

export const deleteSerieRequest=async(idSerie)=>{
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/series/${idSerie}`)
}

export const updateSerieRequest=async(serie,idSerie)=>{
    
    await axios.put(`${import.meta.env.VITE_API_URL}/api/series/${idSerie}`,serie)
}

export const anularSerieRequest=async(serie,idSerie)=>{
    
    await axios.put(`${import.meta.env.VITE_API_URL}/api/series/${idSerie}`,serie)
}

export const getUsersRequest=async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
    return data
}