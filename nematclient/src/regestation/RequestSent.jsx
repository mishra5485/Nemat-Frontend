import { Link } from "react-router-dom";
import loginBG from "../assets/loginImages/loginImage.png";
import logo from "../assets/loginImages/nematEnterprisesLogo.png";
import { MdDone } from "react-icons/md";
import InfiniteScrollImage from "../style/InfiniteScrollImage";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import Union from "../assets/loginImages/Union.png"
import RightToLeftanm from "../style/RightToLeftanm";

const PasswordUpdated = () => {

  


  return (
    <div className='w-full h-full object-cover md:flex md:w-full md:h-[100vh]'>
          <div style={{ backgroundImage: `url(${loginBG})` , backgroundRepeat: 'no-repeat',  }} className= 'mobile:w-full sm:w-full  sm:h-[45vh] mobile::bg-center mobile:h-[40vh] mobile:bg-cover sm:bg-center mobile:bg-center sm:bg-cover sm:object-cover  bg-green-700 md:h-[100%]  md:bg-slate-600 md:min-w-[45%] flex-wrap object-cover -z-10 md:max-w-[80%] lg:w-[40%]' > 
            <div className="flex w-[100%] mt-2 sm:mt-5 sm:  md:h-[20%] justify-center items-center   ">
                <Link to={"/"}>
                  <img src={logo} className="sm:w-[100%] z-10 mobile:h-[80px] mobile:w-[107px] sm:h-[90px] md:w-[150px] md:h-[105px] " alt="" />
                </Link>
              </div>  
            </div>

            <div className='mobile:w-full mobile:h-[45px] sm:w-full sm:h-[45px] min-h-[5%] md:max-w-[4%] md:h-full md:mt-2  overflow-hidden  '>
                <RightToLeftanm image={FlowerPattern2}/>

  {             /* Show FlowerPattern for md and larger screens */}
               <InfiniteScrollImage  className="w-full h-full animate-img hidden mobile:hidden sm:hidden md:inline-block"/>
            </div>

            
         <div className='w-full h-full relative flex  flex-col justify-center items-center' >
              <div className="md:W-[100%] mobile:mr-[70%] md:mr-0 sm:mr-0">
                <div className="inline-flex items-center gap-[30px] relative">
      <div className="inline-flex items-end gap-[13px] relative flex-[0_0_auto]">
        <div className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[10px] px-[10px] py-[0.5px] relative bg-[#60713a] rounded-[70px]">
          <div className="relative w-fit mt-[-1.00px] [font-family:'Marcellus-Regular',Helvetica] font-normal text-[#ffffff] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
            1
          </div>
        </div>
        <div className="relative w-fit font-['Marcellus'] font-normal text-[#60713a] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
          Company details
        </div>
      </div>
        <svg width={33} height={7} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M27.3333 3.5C27.3333 4.97276 28.5272 6.16667 30 6.16667C31.4728 6.16667 32.6667 4.97276 32.6667 3.5C32.6667 2.02724 31.4728 0.833333 30 0.833333C28.5272 0.833333 27.3333 2.02724 27.3333 3.5ZM0 4H30V3H0V4Z" fill="#60713A" />
              </svg>
      <div className="inline-flex items-end gap-[13px] relative flex-[0_0_auto]">
        <div className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[10px] px-[8px] py-[0.5px] relative bg-[#60713a] rounded-[70px]">
          <div className="relative w-fit mt-[-1.00px] font-['Marcellus'] font-normal text-[#ffffff] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
            2
          </div>
        </div>
        <div className="relative w-fit font-['Marcellus'] font-normal text-[#60713a] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
          Contact info
        </div>
      </div>
      <svg width={33} height={7} viewBox="0 0 33 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M27.3333 3.5C27.3333 4.97276 28.5272 6.16667 30 6.16667C31.4728 6.16667 32.6667 4.97276 32.6667 3.5C32.6667 2.02724 31.4728 0.833333 30 0.833333C28.5272 0.833333 27.3333 2.02724 27.3333 3.5ZM0 4H30V3H0V4Z" fill="#60713A" />
              </svg>
      <div className="inline-flex items-end gap-[13px] relative flex-[0_0_auto]">
        <div className="flex flex-col w-[25px] h-[25px] items-center justify-center gap-[10px] px-[10px] py-[0.5px] relative bg-[#60713a] rounded-[70px]">
          <div className="relative w-fit mt-[-1.00px] ml-[-2.00px] mr-[-2.00px] font-['Marcellus'] font-normal text-[#ffffff] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
            3
          </div>
        </div>
        <div className="relative w-fit font-['Marcellus'] font-normal text-[#60713a] text-[16px] tracking-[0] leading-[23.9px] whitespace-nowrap">
          Request sent
        </div>
      </div>
              </div>
              </div>
                                          <div className='h-[60%] w-[90%]  relative flex flex-col justify-center items-center'>
                                                <div className="relative w-[31px] h-[40px]">
                            <div style={{ backgroundImage: `url(${Union})`}} className={`relative fixed w-[31px] h-[40px] top-0 left-0  bg-[100%_100%]`}>
                                

                                <span className="absolute w-[28px] h-[30px] top-[10px] left-[2px]"><MdDone className="absolute top-[5px] left-[5px]" color="white"/></span>
                      
                            </div>
                          </div>
                           <h1 className="sm:mt-[26px] mobile:mt-[26px] text-text_Color font-roxborough font-medium text-[20px] leading-31 ">Request Sent Successfully</h1>

                           <p className='text-center mt-[30px] text-text_Color font-Marcellus font-normal text-16 leading-22 tracking-tight'>
                              Lorem ipsum dolor sit amet consectetur. Viverra morbi molestie est venenatis turpis varius venenatis. Felis quisque congue massa consectetur eleifend. Enim velit fermentum nulla urna.
                           </p>

                            <Link to= {"/"} className="inline-flex mobile:w-[100%] sm:w-full md:w-[25%] h-[43px]  mobile:mt-[7%]  items-center justify-center  rounded-3xl bg-[#60713A]  leading-7 text-white font-Marcellus text-base  leading-17 tracking-normal text-center  hover:bg-hoverBGGreen transition-all duration-200 hover:text-white hover:bg-">
                           <button className=''>
                                NEXT
                              </button>
                           </Link>

                        </div>
        </div>

   </div>
  )
}

export default PasswordUpdated