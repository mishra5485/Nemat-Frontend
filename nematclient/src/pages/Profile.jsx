
import React, { useEffect, useState } from "react";
import Footer from "../component/footer/footer";
import NavBars from "../component/common/NavBars";
import { VscAccount } from "react-icons/vsc";
import ProfileDetails from "../component/ProfileDetails";
import { useSelector } from "react-redux";
import OrderDetails from "../component/OrderDetails";

const Profile = () => {


  const [clickedButton, setClickedButton] = useState("profile");

  const { user } = useSelector((store) => store.profile);
  const Company_Name = user.customer_CompanyName

 

  return (
    <div>
      <div>
        <NavBars />
      </div>

      <div className="w-full">
        <div className="w-[90%] mx-auto ">
          <div className="flex w-full text-text_Color font-roxborough font-bold border-b-2 pb-5 border-text_Color ">
            <VscAccount
              size={25}
              className="bg-Cream rounded-full my-auto mr-5 ml-2"
            />
            <h1 className="text-2xl">{Company_Name}</h1>
          </div>

          <div className="mt-8 text-white md:flex md:w-full ">
            <div className="mobile:flex mobile:w-[100%] mobile:justify-between mobile:mx-auto mobile:gap-x-3 sm:flex sm:w-[100%] sm:justify-between sm:mx-auto sm:gap-x-3  md:flex-col md:justify-start md:w-[20%] md:mt-8  ">
              <button
                className={`mobile:py-2 sm:py-2 mobile:w-[50%] sm:w-[50%] md:w-full font-Marcellus uppercase mobile:border-2 mobile:rounded-3xl sm:border-2 sm:rounded-3xl md:border-none md:rounded-none md:py-0  md:text-start ${
                  clickedButton === "order" ? "mobile:bg-text_Color2 sm:bg-text_Color2 mobile:text-white sm:text-white md:bg-transparent md:text-text_Color2  md:underline "  : "text-text_Color2"
                  
                }`}
                onClick={() => {
                  setClickedButton("order");
                }}
              >
                Order Details
              </button>
              <button
                className={`mobile:py-2 sm:py-2 mobile:w-[50%] sm:w-[50%] md:w-full font-Marcellus uppercase mobile:border-2 mobile:rounded-3xl sm:border-2 sm:rounded-3xl md:border-none md:rounded-none md:py-0 md:bg-none md:text-start md:mx-0 ${
                  clickedButton === "profile" ? "mobile:bg-text_Color2 sm:bg-text_Color2 mobile:text-white sm:text-white md:bg-transparent md:text-text_Color2  md:mt-3 md:underline"  : "text-text_Color2"
                }`}
                onClick={() => {
                  setClickedButton("profile");
                }}
              >
                Profile Details
              </button>
            </div>
            <div className="md:w-[80%]">

            {/* If Order Details Click  */}
            {clickedButton === "order" ? (
              <OrderDetails/>
              ) : 
              // If Profile Details selected 
              clickedButton === "profile" ? (
                <div>
                  <ProfileDetails />
               </div>
            ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
       <Footer />
      </div>
    </div>
  );
};

export default Profile;
