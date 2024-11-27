import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/home/Navbar'


export default function MainLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
