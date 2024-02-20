import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserNewComponent = ({selectedArray }) => {

   console.log(selectedArray)
      
  return (


    <div>
         

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    User Name
                </th>
                <th scope="col" className="px-6 py-3">
                     User GST No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile Number
                </th>
                <th scope="col" className="px-6 py-3">
                    status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
           {
               selectedArray?.map((item) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.CompanyName}
                     </th>
                     <td className="px-6 py-4">
                        {item.GstNo}
                     </td>
                     <td className="px-6 py-4">
                        {item.MobileNumber}
                     </td>
                     <td className="px-6 py-4 ">
                        <div className='ml-4'>
                           {item.status === 1 ? (
                                 <div className="h-3 w-3 rounded-full bg-green-500 me-2"></div> 
                           ) : (
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> 
                           )}
                        </div>
                        
                     </td>
                     
                     <td className="px-6 py-4" >
                        <Link to={`/dashboard/user-mangement/user_prev/${item._id}`}>
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Prev</a>
                        </Link>
                     </td>
                  </tr>
               ))
            }
            
        </tbody>
    </table>
</div>

    </div>
  )
}

export default UserNewComponent