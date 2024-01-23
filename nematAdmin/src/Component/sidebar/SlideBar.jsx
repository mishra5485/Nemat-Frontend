import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineAudit, AiOutlineTable } from "react-icons/ai";
import { MdOutlineDiscount } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SiWebpack } from "react-icons/si";
import { FaUserPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
// import { logoutAsync } from "../features/auth.js";
// import getToken from "../commonfunctions/getToken.js";

const Sidebar1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.profile);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenAudit, setIsDropdownOpenAudit] = useState(false);
  const [isDropdownOpenReport, setIsDropdownOpenReport] = useState(false);
  const [isdropdownSetting  , setDropdownSetting] = useState(false)
  const [userMangementDrop , setUserMangementDrop ] = useState(false)

  const [isOpen, setIsOpen] = useState(false);

//   const config = getToken();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const AudittoggleDropdown = () => {
    setIsDropdownOpenAudit(!isDropdownOpenAudit);
  };

  const ReporttoggleDropdown = () => {
    setIsDropdownOpenReport(!isDropdownOpenReport);
  };

  const settingToggleDropDown = () => {
    setDropdownSetting(!isdropdownSetting)
  }

  const UserHandler = () => {
    navigate("")
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = () => {
    closeSidebar();
  };

  const logout = async () => {
    try {
      let response = await axios.post(
      //   ${import.meta.env.VITE_REACT_APP_BASE_URL}/user/logout,s
        {
          username: userData.username,
        },
        config
      );
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
        dispatch(logoutAsync());
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 400
        ) {
          toast.error(data);
         //  throw new Error(API Error: Status ${status});
        }
      }
    }
  };

  return (
    <>
      <div className="overflow-auto">
        <button
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            />
          </svg>
        </button>
        <aside
          id="sidebar-multi-level-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between my-3 ">
              <NavLink
                onClick={handleMenuItemClick}
                to="compressionmachinemaster"
                className="flex items-center flex-shrink-0 text-xl text-gray-800 dark:text-gray-200 my-2"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-6 mr-3 sm:h-7"
                  alt="Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-dark">
                  Nemat Management
                </span>
              </NavLink>

              {/* <button
                type="button"
                onClick={handleMenuItemClick}
                className="inline-flex p-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.95 5.95a.75.75 0 010 1.06L11.12 10l3.83 3.83a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0zm-9 0a.75.75 0 000 1.06L8.88 10l-3.83 3.83a.75.75 0 101.06 1.06l4.5-4.5a.75.75 0 000-1.06l-4.5-4.5a.75.75 0 00-1.06 0z"
                  />
                </svg>
                <span className="sr-only">Close sidebar</span>
              </button> */}
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  onClick={toggleDropdown}
                >
                  <AiOutlineTable />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Product Management 
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    isDropdownOpen ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <NavLink
                      to="category"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="sub_category"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Sub-Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="product"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Product
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  onClick={AudittoggleDropdown}
                >
                  <MdOutlineDiscount />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Slabs
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    isDropdownOpenAudit ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <NavLink
                      to="discountSlabe"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Discount Slabs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="quantityscheme"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Quantity Scheme
                    </NavLink>
                  </li>
                   {/* <li>
                    <NavLink
                      to="fragrance"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      All Fragrance 
                    </NavLink>
                  </li> */}
                </ul>
              </li>

              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  onClick={ReporttoggleDropdown}
                >
                  <SiWebpack />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Website
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    isDropdownOpenReport ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  <li>
                    <NavLink
                      to="website/promoHeader"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Promo Header
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="website/bannerSlider"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                     Banner Sliders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="website/admincontact"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Contact US
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                >
                  <FaUserPlus />
                  <NavLink to={"user-mangement"}>

                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    User Mangement
                  </span>
                  </NavLink>
                 
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  onClick={settingToggleDropDown}
                >
                  <IoSettings />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Settings & Config
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <ul
                  id="dropdown-example"
                  className={`${
                    isdropdownSetting ? "block" : "hidden"
                  } py-2 space-y-2`}
                >
                  
                  <li>
                    <NavLink
                      to="settings/smtp"
                      onClick={handleMenuItemClick}
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      SMTP
                    </NavLink>
                  </li>
                  
                </ul>
              </li>
            </ul>
            
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                onClick={logout}
              >
                <SlLogout className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar1;