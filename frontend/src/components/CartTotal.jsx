/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import useShopStore from '../store/shopStore';
import Title from './Title';

const CartTotal = () => {
    const { getCartAmount, currency, delivery_fee } = useShopStore();
    

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={"CART"} text2={"TOTALS"} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{getCartAmount()}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Delivery Fee</p>
                    <p>{currency}{getCartAmount()===0? 0 : delivery_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>{currency}{getCartAmount()===0? 0 : (getCartAmount()+delivery_fee)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
