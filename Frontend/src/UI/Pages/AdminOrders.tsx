import React, {useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Service from '../../Service/Service';
import { Context } from '../../Context/ContextWrapper';

interface IShop {
    title: string;
    description: string;
    logo: string;
    holder: string;
  }

const AdminOrders = () => {
    const [shopReq, setShopReq] = useState<IShop[]>([])
    const [action, setAction] = useState<number>(0);
    const navigation = useHistory();

    const { user, getTransact, transact } = useContext(Context);
    
    useEffect(() => {
        (async () => {
          const req: IShop[] = await Service.viewShopOrders();
          setShopReq(req);
          console.log(shopReq)
        })();
    }, [user, action]);
    
    const applyRequest = async(id:number, answer: boolean) =>{
        await Service.applyReqShop(id, answer, user);
        getTransact(transact + 1);
        setAction(action+1);
    }

    const applyRequestHandler = (id:number, answer: boolean) => {
        applyRequest(id, answer).catch((error) => {
          console.error('Ошибка при обработке заявки', error);
          alert('Ошибка при обработке заявки');
        });
      };

  return (
    <>
      <section className="p-3 sm:p-5">
      <h1 className='text-3xl font-semibold text-gray-900 dark:text-white flex flex-col items-center'>Лист заявок на регистрацию магазина</h1>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                {/* <Link to="/ShopPanel" className="m-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Управление товарами</Link> */}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">ID</th>
                    <th scope="col" className="px-4 py-3">Логотип</th>
                    <th scope="col" className="px-4 py-3">Название</th>
                    <th scope="col" className="px-4 py-3">Описание</th>
                    <th scope="col" className="px-4 py-3">Блокчейн-адрес</th>
                    <th scope="col" className="px-4 py-3">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    shopReq.map((el, idx) => {
                        if (el.holder === "0x0000000000000000000000000000000000000000") return null;

                      return (
                        <tr className="border-b dark:border-gray-700" key={idx}>
                          <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx}</th>
                          <td className="px-4 py-3"><img className="w-1/5" src={`./images/${el.logo}`} alt="Логотип магазина" /></td>
                          <td className="px-4 py-3">{el.title}</td>
                          <td className="px-4 py-3">{el.description}</td>
                          <td className="px-4 py-3">{el.holder}</td>
                          <td className="px-4 py-3 flex items-center justify-end">
                              <div className=''>
                                <button onClick={() => applyRequestHandler(idx, true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Добавить
                                  </span>
                                </button>
                                <button onClick={() => applyRequestHandler(idx, false)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Отменить
                                    </span>
                                </button>
                            </div>
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

export default AdminOrders;