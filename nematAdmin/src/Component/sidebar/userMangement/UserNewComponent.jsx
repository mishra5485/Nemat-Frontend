import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserNewComponent = ({ selectedArray }) => {
  console.log("Inside UserComponet ", selectedArray);


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Company GST No.
              </th>
              <th scope="col" className="px-6 py-3">
                Company Number
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
            {selectedArray?.map((item) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.CompanyName}
                </th>
                <td className="px-6 py-4">{item.GstNo}</td>
                <td className="px-6 py-4">{item.MobileNumber}</td>
                <td className="px-6 py-4 ">
                  <div className="">
                    {item.status === 1 ? (
                      <p className="bg-green-500 p-2 text-white text-center rounded-lg">Active</p>
                    ) : (
                      <p  className="bg-blue-500 p-2 text-white text-center rounded-lg">InActive</p>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <Link to={`/dashboard/user-mangement/user_prev/${item._id}`}>
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Prev
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserNewComponent;
