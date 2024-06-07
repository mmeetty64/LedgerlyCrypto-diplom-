import React, { FC } from 'react'
import { Header } from '../Header/Header'

interface ILayout{
    children: React.ReactNode
}

export const Layout: FC<ILayout> = ({children}) => {
  return (
    <>
    <Header/>
    <div style={{padding: "2rem 7rem 0 7rem", display: "flex", justifyContent: "center"}}>{children}</div>
    </>
  )
}
