import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import 'flowbite';
import { Context } from '../../../Context/ContextWrapper';
import Service from '../../../Service/Service';
import { initFlowbite } from 'flowbite';

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

export const ShopCatalog = () => {
  const [catalog, setCatalog] = useState<ICatalog[]>([]);
  const [action, setAction] = useState<number>(0);
  const navigation = useHistory();

  const { user, getTransact, transact } = useContext(Context);

  useEffect(() => {
    (async () => {
      const req: ICatalog[] = await Service.viewCatalog();
      setCatalog(req);
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

  const actionProduct = async (idProd: number, type: number) => {
    if (type === 1) {
      await Service.frozeProduct(idProd, user);
      alert('Продукт заморожен!');
    }
    if (type === 2) {
      await Service.unfrozeProduct(idProd, user);
      alert('Продукт разморожен!');
    }
    setAction(action + 1);
  };

  const actionProductHandler = (idProd: number, type: number) => {
    actionProduct(idProd, type).catch((error) => {
      alert('Произошла ошибка!');
    });
  };

  const createProductHandler = async (e: any) => {
    e.preventDefault();
    const { target } = e;
    const formData = new FormData();
    formData.append('image', target[4].files[0]);

    try {
      const uploadResponse = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      await Service.createProduct(target[0].value, target[3].value, target[2].value, target[1].value, [uploadData.filePath], user);
      alert('Товар добавлен!');
      navigation.push('/ShopPanel');
    } catch (error) {
      console.error('Ошибка при добавлении товара', error);
      alert('Ошибка при добавлении товара');
    }
    setAction(action + 1);
  };

  return (
    <>
      <section className="p-3 sm:p-5">
      <h1 className='text-3xl font-semibold text-gray-900 dark:text-white flex flex-col items-center'>Товары в продаже</h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <Link to="/ShopOrdersPanel" className="mb-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Список заказов</Link>
                <button id="defaultModalButton" data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Добавить товар</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-3">Название</th>
                    <th scope="col" className="px-4 py-3">Описание</th>
                    <th scope="col" className="px-4 py-3">Количество</th>
                    <th scope="col" className="px-4 py-3">Цена</th>
                    <th scope="col" className="px-4 py-3">Дата добавления</th>
                    <th scope="col" className="px-4 py-3">Статус</th>
                    <th scope="col" className="px-4 py-3">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    catalog.map((el) => {
                      if (el.shop.toLowerCase() !== user.toLowerCase()) return null;

                      return (
                        <tr className="border-b dark:border-gray-700" key={el.id}>
                          <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{el.id}</th>
                          <td className="px-4 py-3">{el.title}</td>
                          <td className="px-4 py-3">{el.description}</td>
                          <td className="px-4 py-3">{el.amount}</td>
                          <td className="px-4 py-3">{el.tokenPrice / 10000} LED</td>
                          <td className="px-4 py-3">{viewDataHandler(el.created_at)}</td>
                          {
                            el.status ? 
                            <td className="px-4 py-3"><p className='text-rose-400'>Активен</p></td>
                            :
                            <td className="px-4 py-3"><p className='text-cyan-500'>Заморожен</p></td>
                          }
                          <td className="px-4 py-3 flex items-center justify-end">
                            {
                              el.status ?
                                <button onClick={() => actionProductHandler(el.id, 1)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Заморозить
                                  </span>
                                </button>
                                :
                                <button onClick={() => actionProductHandler(el.id, 2)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 group-hover:from-rose-400 group-hover:via-fuchsia-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-fuchsia-200 dark:focus:ring-fuchsia-800">
                                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Разморозить
                                  </span>
                                </button>
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

      <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Добавить товар
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={createProductHandler}>
              <div className="p-6 space-y-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="title" id="title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Название товара</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="number" name="amount" id="amount" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Количество</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="number" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Цена (в токенах)</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Описание</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input type="file" name="image" id="image" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                  <label htmlFor="image" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Изображение товара</label>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Добавить товар</button>
                <button type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" data-modal-hide="defaultModal">Отмена</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

