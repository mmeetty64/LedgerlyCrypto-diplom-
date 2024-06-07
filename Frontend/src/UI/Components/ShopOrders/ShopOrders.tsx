import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import 'flowbite';
import { Context } from '../../../Context/ContextWrapper';
import Service from '../../../Service/Service';
import { initFlowbite } from 'flowbite';

interface IOrder {
    number: number;
    product: number;
    amount: number;
    user: string;
    status: number;
    created_at: number;
    addDelivery: string;
    price: number;
}

interface ICatalog {
    id: number;
    title: string;
    description: string;
    tokenPrice: number;
    shop: string;
    amount: number;
    created_at: number;
    status: boolean;
  }

export const ShopOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [action, setAction] = useState<number>(0);
    const [catalog, setCatalog] = useState<ICatalog[]>([]);
    const navigation = useHistory();

    const { user, getTransact, transact } = useContext(Context);

    useEffect(() => {
      (async () => {
        const cat: ICatalog[] = await Service.viewCatalog();
        setCatalog(cat);
        console.log(catalog)
        const req: IOrder[] = await Service.viewOrders();
        setOrders(req);
      })();
    }, [user, action]);


    useEffect(() => {
      initFlowbite();
      import('flowbite');
    }, []);
    
    const viewDataHandler = (timestamp: number) => {
      const date = new Date(timestamp * 1000);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      return formattedDate;
    };

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

    const deliveryOrderAction = async(idOrder: number) =>{
        await Service.deliveryOrder(idOrder, user);
        getTransact(transact + 1);
        setAction(action+1);
    }

    const deliveryOrderHandler = (idProd: number) => {
        deliveryOrderAction(idProd).catch((error) => {
          console.error('Ошибка при подтверждении заказа', error);
          alert('Ошибка при подтверждении заказов');
        });
    };
    const rejectOrder = async (idProd: number) => {
      await Service.rejectOrder(idProd, user);
      getTransact(transact + 1);
      setAction(action+1);
    };

    const rejectOrderHandler = (idProd: number) => {
      rejectOrder(idProd).catch((error) => {
        console.error('Ошибка при покупке токенов', error);
        alert('Ошибка при покупке токенов');
      });
    };

  return (
    <>
      <section className="p-3 sm:p-5">
      <h1 className='text-3xl font-semibold text-gray-900 dark:text-white flex flex-col items-center'>Лист заказов</h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link to="/ShopPanel" className="m-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Управление товарами</Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-3">Продукт</th>
                    <th scope="col" className="px-4 py-3">Количество</th>
                    <th scope="col" className="px-4 py-3">Покупатель</th>
                    <th scope="col" className="px-4 py-3">Цена</th>
                    <th scope="col" className="px-4 py-3">Дата добавления</th>
                    <th scope="col" className="px-4 py-3">Статус</th>
                    <th scope="col" className="px-4 py-3">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    [...orders].reverse().map((el) => {
                      if (catalog[el.product].shop.toLowerCase() != user.toLowerCase()) return null;

                      return (
                        <tr className="border-b dark:border-gray-700" key={el.number}>
                          <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{el.number}</th>
                          <td className="px-4 py-3">{catalog[el.product].title}</td>
                          <td className="px-4 py-3">{el.amount}</td>
                          <td className="px-4 py-3">{el.user}</td>
                          <td className="px-4 py-3">{el.price / 10000} LED</td>
                          <td className="px-4 py-3">{viewDataHandler(el.created_at)}</td>
                          <td className="px-4 py-3">{viewStatusHandler(el.status)}</td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            {
                              el.status == 0 ?
                              <div className=''>
                                <button onClick={() => deliveryOrderHandler(el.number)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    В доставку
                                  </span>
                                </button>
                                <button onClick={() => rejectOrderHandler(el.number)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Отменить
                                    </span>
                                </button>
                            </div>
                                : ""
                            }
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

