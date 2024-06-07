import React, { createContext, FC, useState } from 'react'
import {IProps, IValues } from './Context.Interface';

export const Context = createContext({} as IValues);

export const ContextWrapper: FC<IProps> = ({ children }) => {

    const [user, setUser] = useState<string>("");
    const [transact, setTransact] = useState(0)
    const [balance, setBalance] = useState(0)
    const [role, setRole] = useState(0)

    const getUser = (user: string) => {
        setUser(user);
        console.log(user)
    }

    const getTransact = (transact: number) => {
        setTransact(transact)
    }

    const getBalance = (balance: number) => {
        setBalance(balance)
        console.log(balance)
    }

    const getRole = (role: number) => {
        setRole(role)
        console.log(role)
    }

    const logout = () => {
        setUser('')
        setRole(0)
    }

    const values = {
        user,
        getUser,
        logout,
        transact,
        getTransact,
        balance,
        getBalance,
        role,
        getRole
    }
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}
