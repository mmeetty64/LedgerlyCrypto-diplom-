import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import 'flowbite';
import { Context } from '../../../Context/ContextWrapper';
import Service from '../../../Service/Service';
import { initFlowbite } from 'flowbite';

interface IShop {
    title: string;
    description: string;
    logo: string;
    holder: string;
  }

export const ReqShop = () => {
  
    const navigation = useHistory();
    const [shopReq, setShopReq] = useState<IShop[]>([])
    const [isUserHolder, setIsUserHolder] = useState<boolean>(false)

    const { user, getTransact, transact } = useContext(Context);

    const requireShopHandler = async(e: any) =>{
        e.preventDefault();
        const { target } = e;
        const formData = new FormData();
        formData.append('image', target[2].files[0]);

        try {
          const uploadResponse = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          });

          const uploadData = await uploadResponse.json();

          await Service.requireShop(target[0].value, target[1].value, uploadData.filePath, user);
          alert('Заявка отправлена!');
          navigation.push('/Home');
        } catch (error) {
          console.error('Ошибка при добавлении заявки', error);
          alert('Ошибка при добавлении заявки');
        }
        getTransact(transact + 1);
    }

    useEffect(() => {
        (async () => {
          const req: IShop[] = await Service.viewShopOrders();
          setShopReq(req);
          console.log(shopReq)
        })();
    }, [user]);

    useEffect(() => {
        (async () => {
        if (shopReq.length === 0) return; 
    
        const isUser = shopReq.some((shop) => shop.holder.toLowerCase() === user.toLowerCase());
        setIsUserHolder(isUser);
        console.log(isUserHolder)
        })();
    }, [shopReq]);
    
    
  return (  
    <>
    {isUserHolder  ?
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-white flex flex-col items-center mt-5 mb-5'>Вы уже отправили заявку!</h1>
        :
        <form onSubmit={requireShopHandler} className='w-2/5'>
        <h1 className='text-3xl font-semibold text-gray-900 dark:text-white flex flex-col items-center mt-5 mb-5'>Заявка на регистрацию магазина</h1>
          <div className="p-6 space-y-6">
            <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Название магазина</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="amount" id="amount" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Описание магазина</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input type="file" name="image" id="image" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
              <label htmlFor="image" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Логотип магазина</label>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Отправить заявку</button>
          </div>
        </form>
        
    }
    </>
  );
};

