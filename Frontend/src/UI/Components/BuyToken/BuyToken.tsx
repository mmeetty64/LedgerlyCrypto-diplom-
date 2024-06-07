import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import 'flowbite';
import { Context } from '../../../Context/ContextWrapper'
import Service from '../../../Service/Service';



export const BuyToken = () => {
  
    const [tokenPrice, setTokenPrice] = useState<number>(0)

    const {user, transact, getTransact, balance} = useContext(Context);


    const buyTokenHandler = async(e: any) =>{
        e.preventDefault();
        const {target} = e
        const priceData = await Service.viewTokenPrice()
        console.log(priceData)
        
        try {
            await Service.buyTokens(target[0].value, user, +priceData)
            alert('Токены куплены');
          } catch (error) {
            console.error('Ошибка при покупке токенов', error);
            alert('Ошибка при покупке токенов');
          }
          getTransact(transact+1);
    }

      
  return (
    <>
    {
        user != '' ?
        <form className="mt-5 mb-5 flex flex-col items-center" onSubmit={buyTokenHandler}>
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-white flex flex-col items-center'>Ваш баланс токенов: {balance / 10000} LED</h1>
          <div className="mt-5 mb-5">
            <h1 className='text-3xl font-semibold text-gray-900 dark:text-white mt-5 mb-5 flex flex-col items-center'>Купить токены</h1>
            <input type="number" id="description" className="mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Количество токенов" required />
          </div>
          <div className="mb-5">
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Купить</button>
        </form> 
    : <h1 className='text-3xl font-semibold text-gray-900 dark:text-white mt-5 mb-5 flex flex-col items-center'>Войдите в аккаунт</h1>
    }
    </>
    
  )
}
