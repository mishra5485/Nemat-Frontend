import { useState } from 'react'
import RightToLeftText from '../style/RightToLeftText'
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown , FaAngleUp  } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../assets/HomePage/Frame.png"
import { GiHamburgerMenu } from "react-icons/gi";
import MobileBG from "../assets/HomePage/mobileBG.png" 
import DottedLineGold from "../assets/HomePage/DottedLineGold.png"
import DesktopBG from "../assets/HomePage/desktopBG.png"
import { useMediaQuery } from 'react-responsive';
import Goldenline from '../style/goldenline';
import {Link, useNavigate} from "react-router-dom"
import "../App.css"



const Home = () => {

  

   const isMobile = useMediaQuery({ query: '(max-width: 760px)' });
   const [showdata , SetShowData] = useState(false)
   const [showAngle , setShowAngle] = useState({})
   const [showNavbar , SetShowNavbar] = useState(true)
   const navigate = useNavigate();

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


  const mobileNavbar = () => {
    SetShowNavbar(!showNavbar)
  }

  const seriesData = [
    {
      id: 1,
      series: 'Attars',
      subSeriesname: [
        { SubSeriesname: '96 Series', link: '' },
        { SubSeriesname: '726 Series', link: '' },
        { SubSeriesname: 'Shaahi Series', link: '' },
        { SubSeriesname: 'Nazneen Series', link: '' },
      ],
    },
    {
      id: 2,
      series: 'Roll Ons',
      subSeriesname: [
        { SubSeriesname: 'Fancy Series', link: '' },
        { SubSeriesname: 'Deluxe Series', link: '' },
        { SubSeriesname: 'Uber Luxe Series', link: '' },
        { SubSeriesname: 'Abyaz Series', link: '' },
        { SubSeriesname: 'Janata Series', link: '' },
        { SubSeriesname: 'Cooler Series Series', link: '' },
      ],
    },
    {
      id: 3,
      series: 'Non Alcoholic Sprays',
      subSeriesname: [
        { SubSeriesname: '50gm Spray Series', link: '' },
        { SubSeriesname: 'Ehsaas Series', link: '' },
        { SubSeriesname: 'Pocket Perfume Series', link: '' },
      ],
    },
    {
      id: 4,
      series: 'Agarbattis',
      subSeriesname: [
        { SubSeriesname: 'Premium Masala Agarbatti', link: '' },
      ],
    },
  ]

  const details = [
    {
      id:1,
      title:"ABOUT",
      link:""
    },
    {
      id:2,
      title:"QUALITY ASSURANCE",
      link:""
    },
    {
      id:3,
      title:"CONTACT",
      link:""
    },
  ]

  const [selectedSeries, setSelectedSeries] = useState(null);

  const toggleSubSeries = (seriesId) => {
    setSelectedSeries((prevSelectedSeries) => (prevSelectedSeries === seriesId ? null : seriesId));

    setShowAngle((prevShowAngle) => {
      const newShowAngle = { ...prevShowAngle };

      if (!newShowAngle[seriesId]) {
        Object.keys(newShowAngle).forEach((key) => {
          if (key !== seriesId) {
            newShowAngle[key] = false;
          }
        });
      }

      newShowAngle[seriesId] = !prevShowAngle[seriesId];

      return newShowAngle;
    });
  };


  return (
    <div className='mt-0  overflow-auto' >
    <header className='fixed w-full left-0 z-0 top-0'>
      <div className='w-[100%]'>
         <RightToLeftText/>
      </div>

      {
          !showNavbar ? (
            <div className='w-[100%] h-[100vh] bg-[#e9e9e9]'>
                <div className=' w-full flex  flex-nowrap justify-between  items-center  p-4'>
                <div className='flex gap-3'>
                      <AiOutlineShopping size={30} onClick={() => navigate("/cart")}/>
                      <CgProfile onClick={() => navigate("/login")} size={30}/>
                </div>
                <div className='w-[143px] h-[66px]'>
                        <img src={logo} className='w-full h-full ' />
                </div> 
                <IoIosCloseCircleOutline size={30} onClick={mobileNavbar}  /> 
                </div>
                <hr/>

                <div>
      {seriesData.map((series) => (
        <div key={series.id} className='flex flex-col '>
          <div className='flex justify-between items-center p-3'
            onClick={() => toggleSubSeries(series.id)}
          >

          <button
            className="font-Marcellus text-text_Color text-2xl hover:underline "
            type="button"
            >
            {series.series}
          </button>
          {
             <p>{showAngle[series.id] ? <FaAngleUp size={20}/> : <FaAngleDown size={20}/> } </p>
          }
            </div>

          {selectedSeries === series.id && (
            <div
              className="z-10 "
            >
              <ul className="py-2 text-base pl-3 font-Marcellus text-text_Color  ">
                {series.subSeriesname.map((subSeries) => (
                  <li key={subSeries.SubSeriesname} className='hover:underline'>
                    <a
                      href={subSeries.link}
                      className=""
                    >
                      {subSeries.SubSeriesname}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
              
          <div className='p-3 font-Marcellus  text-xl '>
            {
              details.map((detail) => (
                <Link key={detail.id} to={detail.link} className='p-1 text-bg_green hover:underline '>
                  <h1>{detail.title}</h1>
                </Link>
              ))
            }
          </div>


            </div>


          ) : (
            <div style={{ backgroundImage: `url(${isMobile ? MobileBG : DesktopBG })`,  }} className='w-full h-[90vh]  mobile:bg-cover sm:bg-center'>
        
            <div  className=' relative py-4 '>
              <div className=''>
      
              </div>
                <div className='w-[100%] md:w-[90%] flex flex-nowrap justify-between  items-center  m-auto px-5'>
                    <div className='md:hidden'>
                        <IoSearchOutline  size={30} color=''/>
                    </div>   
                    <div className='flex gap-x-4 sm:hidden mobile:hidden md:flex lg:flex  '>

                      <h1 className='flex items-center'>
                        SHOP 
                        <span className='p-1 mt-[2px] animate-bounce'><FaAngleDown size={15}/></span>
                      </h1>
                      <h1>
                        ABOUT 
                      </h1>
                      <h1>
                        CONTACT 
                      </h1>
                    </div>
                    <div className='w-[143px] h-[66px]'>
                        <img src={logo} className='w-full h-full ' />
                      </div>  
                    <div className='md:hidden' onClick={mobileNavbar}>
                      {
                        showNavbar ?  <GiHamburgerMenu size={30} color=''/> : null
                      }
                     
                    </div> 
                    <div className='flex items-center gap-x-4 sm:hidden mobile:hidden md:flex lg:flex'>
                      <h1>QUALITY ASSURANCE </h1>
                      <IoSearchOutline  size={25} color=''/>
                      <AiOutlineShopping size={25}/>
                      <CgProfile size={25}/>
                    </div>        
                </div>
            </div>
      
            <div className='mobile:w-[100%] mobile:h-[40%] mobile:flex mobile:flex-col mobile:justify-evenly mobile:items-center md:justify-center md:items-start md:h-[80%] md:w-[80%] md:mx-auto md:text-start md:gap-y-4'>
                
                <h1 className='font-Abel  md:text-start font-[25px]'>
                    ATTAR 96
                </h1>
                <h1 className='font-Abel font-[35px] '> 
                  LONDON SERIES 
                </h1>
      
                <p className='w-[80%] md:w-[430px] md:text-start mobile:text-center font-Marcellus'>
                  Most fonts have a particular weight which corresponds to one of the numbers in Common weight name mapping. However some fonts, called variable fonts.
                </p>
      
                <button className='w-[137px] h-[43px] bg-bg_green rounded-3xl'>
                  SHOP NOW
                </button>
            </div>
      
      
            </div>
          )
      }
      <div className='p-2  w-full '>
        <Goldenline image={DottedLineGold}  />
      </div>
    </header>
      <h1>
        hello 
      </h1>
      <h1>
        hello 
      </h1>
      <h1>
        hello 
      </h1>
      <h1>
        hello 
      </h1>
    </div>
  )
}

export default Home

