/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import useShopStore from '../store/shopStore'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
    const {clearCart,token}=useShopStore()
    const navigate=useNavigate()
    const [searchParams,setSearchParams]=useSearchParams()
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
    const url=import.meta.env.VITE_BACKEND_URL

    const verifyPayment=async()=>{
        try {
            if(!token){
                return toast.error('Please login to verify payment')
            }
            const response=await axios.post(`${url}/api/order/verify-stripe`,{orderId,success},{headers:{token}})
            if(response.data.success){
                clearCart()
                navigate('/orders')
                toast.success('Payment verified successfully')
            }else{
                toast.error('Failed to verify payment')
                navigate('/cart')
            }
        } catch (error) {
            toast.error(error.message)    
        }
    }

    useEffect(()=>{
       verifyPayment()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
