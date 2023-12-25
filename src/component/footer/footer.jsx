import { useState } from "react";
import FooterImage from "../../assets/HomePage/FooterImage.png"
import logo from "../../assets/loginImages/nematEnterprisesLogo.png"
import { FaAngleDown , FaAngleUp  } from "react-icons/fa6";


const footer = () => {

   const footerDatas = [
      {
         id: 1,
         series: 'Shop Categories',
         subSeriesname: [
        { SubSeriesname: 'Rollons', link: '' },
        { SubSeriesname: 'Sprays', link: '' },
        { SubSeriesname: '96 Series', link: '' },
        { SubSeriesname: '726 Series', link: '' },
        { SubSeriesname: 'Cooler perfumes and Janata Series ', link: '' },
      ],
      },
      {
         id: 2,
         series: 'Help',
         subSeriesname: [
        { SubSeriesname: 'Contact', link: '' },
        { SubSeriesname: 'Reviews ', link: '' },
        { SubSeriesname: 'Privacy Policy', link: '' },
        { SubSeriesname: 'Refund Policy', link: '' },
        { SubSeriesname: 'Terms Of Service', link: '' },
      ],
      },
      {
         id: 3,
         series: 'About',
         subSeriesname: [
        { SubSeriesname: 'Our story', link: '' },
        { SubSeriesname: 'Quality Assurance', link: '' },
        { SubSeriesname: 'FAQ', link: '' },
      ],
      }
   ]

   const [showAngle , setShowAngle] = useState({})
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
    <div style={{ backgroundImage: `url(${FooterImage})` , backgroundRepeat: 'no-repeat',  }} className="w-full h-[900px] bg-center flex flex-col justify-center items-center bg-Cream bg-cover">
      <div className="w-[90%] h-full overflow-hidden " >
         <div className='w-full mobile:h-[30%] mobile:mt-[30%] sm:mt-[27%] md:mt-0 mobile:flex sm:flex mobile:justify-center mobile:items-center sm:items-center '>
               <img src={logo} className='w-[143px] h-[80px] ' />
         </div>  


         <div className="mt-1 text-center text-white">
            <h1 className="font-Abel text-2xl">Sign up for our newsletter</h1>
            <p className="mt-2 font-Marcellus text-sm">Be the first to know about our special offers new product launches, and events</p>

            <form className="mt-6">
               <div className="flex border-b-2 ">
                  <input 
                     type="email"
                     className="w-[80%] bg-transparent "
                     placeholder="Shop Categories"
                     />
                     <span>Sign up</span>
               </div>
            </form>

            <div className="mt-8">
               {footerDatas.map((footerData) => (
        <div key={footerData.id} className='flex flex-col mb-3'>
          <div className='flex justify-between items-center pb-1'
            onClick={() => toggleSubSeries(footerData.id)}
          >

          <button
            className="font-Marcellus  text-xl hover:underline "
            type="button"
            >
            {footerData.series}
          </button>
          {
             <p>{showAngle[footerData.id] ? <FaAngleUp size={20}/> : <FaAngleDown size={20}/> } </p>
          }
            </div>

          {selectedSeries === footerData.id && (
            <div
              className="z-10 "
            >
              <ul className=" text-base pl-2 mb-2 font-Marcellus  text-start ">
                {footerData.subSeriesname.map((subSeries) => (
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

            <div className="flex justify-between mobile:mt-8 sm:mt-5">
               <h1 className="w-[30%] text-start font-roxborough">Whole sale Purchase</h1>
               <button className="p-3 bg-white text-text_Color rounded-3xl font-Marcellus">LOGIN FOR BUSINESS</button>
            </div>
         </div>
      </div>
    </div>
  )
}

export default footer