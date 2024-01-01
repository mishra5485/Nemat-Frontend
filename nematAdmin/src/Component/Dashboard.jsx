import React from 'react'
import SlideBar from './sidebar/SlideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
        <SlideBar/>
                <div className="p-4 sm:ml-64">

          <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard