/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"
import { currency } from '../App'

const List = ({token}) => {

  const url=import.meta.env.VITE_BACKEND_URL

  const [list,setList]=useState([])

  const fetchList=async()=>{
    try {
      const response=await axios.get(`${url}/api/product/list`)
      if(response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)      
    }
  }
  

  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(`${url}/api/product/remove`,{id},{headers:{token}})
      if(response.data.success){
        toast.success("Product removed successfully")
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {
          list.map((li,index)=>{
            return(
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ' key={index}>
                <img className='w-12' src={li.image[0]} alt="" />
                <p>{li.name}</p>
                <p>{li.category}</p>
                <p>{currency}{li.price}</p>
                <p onClick={()=>removeProduct(li._id)} className='text-right  md:text-center cursor-pointer text-lg'>X</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default List
