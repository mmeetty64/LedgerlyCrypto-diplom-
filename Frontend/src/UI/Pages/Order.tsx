import React, {useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Service from '../../Service/Service';
import { Context } from '../../Context/ContextWrapper';

const Order = () => {
    const navigation = useHistory();
    const { id } = useParams<{ id: string }>();

    const [tokenPrice, setTokenPrice] = useState<number>(0)

    const {user, transact, getTransact, balance} = useContext(Context);

    const createOrderHandler = async(e: any) =>{
      e.preventDefault();
      const {target} = e
      const priceData = await Service.viewTokenPrice()
      setTokenPrice(priceData)
      let prodId = Number(id)

      try {
          await Service.createOrder(prodId,target[0].value, target[1].value, user, tokenPrice)
          alert('Заказ оформлен');
          navigation.push("/Home");
        } catch (error) {
          console.error('Ошибка при заказе', error);
          alert('Ошибка при заказе');
        }

        getTransact(transact+1);
    }

  return (
    <form className="mt-5 mb-5 flex flex-col items-center" onSubmit={createOrderHandler}>
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-white mt-5 mb-5 flex flex-col items-center'>Оформление заказа</h1>
          <div className="mt-5 mb-5">
            <h1 className='text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-5 flex flex-col items-center'>Введите адрес доставки</h1>
            <input type="text" id="description" className="mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Введите адрес" required />
          </div>
          <div className="mt-5 mb-5">
            <h1 className='text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-5 flex flex-col items-center'>Выберите количество товара</h1>
            <input type="number" id="description" className="mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Количество товара" required />
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Купить</button>
    </form> 
  );
};

export default Order;
