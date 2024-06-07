import React, { useContext, useEffect, useState } from 'react'
import {Link, useHistory} from "react-router-dom"
import 'flowbite';
import { Context } from '../../../Context/ContextWrapper'
import Service from '../../../Service/Service';

interface IShop {
  title: string;
  description: string;
  logo: string;
  holder: string;
}

declare var window:any

export const Header = () => {

  const navigation = useHistory();
  const {transact, balance, getBalance, user, getUser, logout, getRole, role} = useContext(Context);
  const [shop, setShop] = useState<IShop>()


  const connect = async () => {
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        getUser(accounts[0]);
        navigation.push("/Home");
      })
      .catch((err: any) => {
        console.log(err);
        alert("Please connect to MetaMask.");
      });
    navigation.push("/Home");
  };

  useEffect(() => {
    (async () => {
      const data = await Service.balanceOf(user);
      getBalance(data)
      console.log(balance)
    })()
  }, [user, transact])

  useEffect(() => {
    (async () => {
      const data = await Service.viewRole(user);
      getRole(data)
      console.log(role)
    })()
  }, [user])

  useEffect(() => {
    (async () => {
      if(role == 2){
        const data = await Service.viewShop(user);
        setShop(data)
        console.log(shop)
      }
    })()
  }, [role])


  return (
    <>
    <nav className="bg-gray-800 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-4">
      <Link to="/Home" className='flex'>
          <img src='../../../../images/logo.svg' className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ledgerly</span>
      </Link>
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd"/>
            </svg>

          </button>
          <div className="z-50 hidden my-4 text-base list-none bg-gray-800 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
            {user != ''? (<>
                <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">Аккаунт: {user.substring(0, 9)}...</p> 
                <p className="mb-3 mt-3 font-normal text-gray-400 dark:text-gray-400">Баланс токенов: {balance / 10000} LED</p> 
                {
                  role == 2 ?
                  <>
                  <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">Аккаунт магазина</p> 
                  <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">{shop?.title}</p> 
                  </>
                  : ""
                }
                { role == 1 ?
                  <>
                    <Link to="/AccountOrders" className='flex'>
                      <p className="self-center text-xl font-semibold whitespace-nowrap dark:text-white mb-3">Заказы</p>
                    </Link>
                    <Link to="/RequireShop" className='flex'>
                      <p className="self-center text-xl font-semibold whitespace-nowrap dark:text-white mb-3">Стать магазином</p>
                    </Link>
                  </>
                  : ""
                }
                </>
              ) : (
                <span className="block text-sm text-white">Гость</span>
              )}
            </div>
            <ul className="py-2 flex justify-center" aria-labelledby="user-menu-button">
              <li className="flex justify-center">
              {user != ''? (
                <button
                  type="button"
                  onClick={logout}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Выйти
                </button>
              ) : (
                <button
                  type="button"
                  onClick={connect}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Войти
                </button>
              )}
              </li>
            </ul>
          </div>
          <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
      </div>
      <div className="items-center justify-end hidden w-full md:flex md:order-1" id="navbar-user">
        <ul className="mr-10 flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {
            role == 2 ?
            <li>
              <Link to="/ShopPanel" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Управление магазином</Link>
            </li> : ''
          }
          {
            role == 3 ?
            <li>
              <Link to="/AdminOrders" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Админ-панель</Link>
            </li> : ''
          }
          <li>
            <Link to="/Home" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Каталог</Link>
          </li>
          <li>
          <Link to="/Token" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Токены</Link>
          </li>
 
        </ul>
      </div>
      </div>
    </nav>
    </>
  )
}
