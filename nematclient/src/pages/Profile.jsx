
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

          <div className="mt-8 text-white">
            <div className="flex w-[100%] justify-between mx-auto gap-x-3 ">
              <button
                className={`py-2 w-[50%] font-Marcellus uppercase border-2 rounded-3xl ${
                  clickedButton === "order" ? "bg-text_Color2 text-white"  : "text-text_Color2"
                  
                }`}
                onClick={() => {
                  setClickedButton("order");
                }}
              >
                Order Details
              </button>
              <button
                className={`py-2 w-[50%] font-Marcellus uppercase border-2 rounded-3xl ${
                  clickedButton === "profile" ? "bg-text_Color2 text-white"  : "text-text_Color2"
                }`}
                onClick={() => {
                  setClickedButton("profile");
                }}
              >
                Profile Details
              </button>
            </div>

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
  );
};

export default Profile;
