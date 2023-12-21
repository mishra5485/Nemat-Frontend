import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RightToLeftText from '../style/RightToLeftText'
import { IoSearchOutline } from "react-icons/io5";
import logo from "../assets/HomePage/Frame.png"
import { GiHamburgerMenu } from "react-icons/gi";
import MobileBG from "../assets/HomePage/mobileBG.png" 
import RightToLeftanm from '../style/RightToLeftanm';
import DottedLineGold from "../assets/HomePage/DottedLineGold.png"
import DesktopBG from "../assets/HomePage/desktopBG.png"
import { useMediaQuery } from 'react-responsive';


const Home = () => {

   const isMobile = useMediaQuery({ query: '(max-width: 760px)' });

  const benerImags = [
    {
      id:1,
      title:"ATTAR 96",
      description:"Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts.",
      mobileImage:MobileBG,
      DesktopImage:DesktopBG,
    },
     {
      id:1,
      title:"96 MAJMUA",
      description:"Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts.",
      mobileImage:MobileBG,
      DesktopImage:DesktopBG,
    },
     {
      id:1,
      title:"EHSAAS",
      description:"Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts.",
      mobileImage:MobileBG,
      DesktopImage:DesktopBG,
    },
     {
      id:1,
      title:"ATTAR 96",
      description:"Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts.",
      mobileImage:MobileBG,
      DesktopImage:DesktopBG,
    },

  ]



  return (
    <div className='mt-0  overflow-auto' >
    <header className='fixed w-full left-0 z-0 top-0'>
      <div className='w-[100%]'>
         <RightToLeftText/>
      </div>
      
      <div style={{ backgroundImage: `url(${isMobile ? MobileBG : DesktopBG })`,  }} className='w-full h-[90vh]  mobile:bg-cover sm:bg-center'>
        
      <div  className='md:hidden relative py-4 '>
          <div className='w-[100%]  flex flex-nowrap justify-between  items-center  m-auto px-5'>
              <div className=''>
                  <IoSearchOutline  size={30} color=''/>
              </div>   
              <div className='w-[143px] h-[66px]'>
                  <img src={logo} className='w-full h-full ' />
                </div>  
              <div>
                <GiHamburgerMenu size={30} color=''/>
              </div>         
          </div>
      </div>

      <div className='mobile:w-[100%] mobile:h-[40%] mobile:flex mobile:flex-col mobile:justify-evenly mobile:items-center md:justify-center md:items-start md:h-[100%] md:w-[80%] md:mx-auto md:text-start ]'>
          
          <h1 className='font-Abel  md:text-start font-[25px]'>
              ATTAR 96
          </h1>
          <h1 className='font-Abel font-[35px] '> 
            LONDON SERIES 
          </h1>

          <p className='w-[80%] text-center font-Marcellus'>
            Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts.
          </p>

          <button className='w-[137px] h-[43px] bg-bg_green rounded-3xl'>
            SHOP NOW
          </button>
      </div>


      </div>
      <div className='p-2  w-full '>
        <RightToLeftanm image={DottedLineGold}  />
      </div>
    </header>
    
    </div>
  )
}

export default Home