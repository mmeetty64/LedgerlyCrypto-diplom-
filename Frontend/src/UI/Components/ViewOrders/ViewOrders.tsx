import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import 'flowbite';
import { Context } from '../../../Context/ContextWrapper'
import Service from '../../../Service/Service';
import { error } from 'console';

interface IOrders {
    number: number;
    product: number;
    amount: number;
    user: string;
    status: number;
    created_at: number;
    addDelivery: string;
    price: number;
  }

export const ViewOrders = () => {

    const [orders, setOrders] = useState<IOrders[]>([])
    const [order, setOrder] = useState<number>(0)

    const {user, getTransact, transact} = useContext(Context);

    useEffect(() => {
        (async () => {
          const data: IOrders[] = await Service.viewOrders();
          setOrders(data)
        })()
    }, [user, order])

    const viewDataHandler = (timestamp: number) =>{
        const date = new Date(timestamp*1000);

        // Получение различных частей даты
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Форматирование даты в строку (например, "YYYY-MM-DD HH:MM:SS")
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return(formattedDate); // Например, "2022-05-23 00:00:00"
    }

    const viewStatusHandler = (status1: number) =>{
        let status = Number(status1)
        switch(status) {
            case 0:  
                return "В подтверждении";
            case 1:  
                return "В доставке";
            case 2:  
                return "Выполнен";
            case 3:  
                return "Отменен";
          }
    }

  const rejectOrder = async (idProd: number) => {
    await Service.rejectOrder(idProd, user);
    getTransact(transact + 1);
    setOrder(order+1);
  };

  const rejectOrderHandler = (idProd: number) => {
    rejectOrder(idProd).catch((error) => {
      console.error('Ошибка при покупке токенов', error);
      alert('Ошибка при покупке токенов');
    });
  };

  const completeOrder = async (idProd: number) => {
    await Service.completeOrder(idProd, user);
    getTransact(transact + 1);
    setOrder(order+1);
  };

  const completeOrderHandler = (idProd: number) => {
    completeOrder(idProd).catch((error) => {
      console.error('Ошибка при покупке токенов', error);
      alert('Ошибка при покупке токенов');
    });
  };

  return (
    <div className='flex justify-evenly w-full flex-wrap'>
        {
        
        orders.map((el) => {
            if (el.user.toLowerCase() != user.toLowerCase() ) return null;
            
          return ( 
            <div className="mt-5 mb-5 mr-2 ml-2 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Номер заказа: {el.number}</h5>
                <Link to={`/product/${el.product}`} className='flex w-full'>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Товар: {el.product}</p>
                </Link>
                <p className="font-normal text-gray-700 dark:text-gray-400">Количество: {el.amount}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Адрес доставки: {el.addDelivery}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Дата заказа: {viewDataHandler(el.created_at)}</p>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Цена: {el.price / 10000} LED</h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Статус заказа: {viewStatusHandler(el.status)}</h5>
                {
                    el.status == 0 ?
                    <button type="button" onClick={() => rejectOrderHandler(el.number)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Отменить заказ</button>
                    :''
                }
                {
                    el.status == 1 ?
                    <button type="button" onClick={() => completeOrderHandler(el.number)} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Подтвердить заказ</button>
                    :''
                }
            </div>
          )
        })
      }
    </div>
  )
}