import { type } from "os";
import { ReactNode } from "react";

interface IValues{
    user: string;
    getUser:(user: string) => void;
    logout: () => void;
    balance: number;
    getBalance:(balance: number) => void;
    transact: number;
    getTransact:(balance: number) => void;
    role: number;
    getRole:(role: number) => void;
}

interface IUser{
    wallet: string;
}

interface IProps{
    children: ReactNode;
}
export type{
    IValues,
    IProps,
}