import React, { useEffect, useState } from "react";
import udaipur from "../assets/HomePage/Udaipur.png";
import mumbai from "../assets/HomePage/mumbai.png";
import himachal_Pradesh from "../assets/HomePage/Himachal-Pradesh.png";
import global from "../assets/HomePage/Global.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NavBars from "../component/common/NavBars";
import DottedLineGold from "../assets/HomePage/DottedLineGold.png";
import Flower from "../assets/HomePage/Flower.png";
import Footer from "../component/footer/footer";

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    AboutUsData();
  }, []);

  const AboutUsData = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/aboutus/getData`
      );

      console.log("About Us Data ===> ", response.data);
      setAboutUsData(response.data);
      setLoading(false)
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (
        status === 404 ||
        status === 403 ||
        status === 500 ||
        status === 302 ||
        status === 409 ||
        status === 401 ||
        status === 400
      ) {
        console.log(data);
        toast.error(data);
        setLoading(false)
      }
    }
  };

  return (
    <div>
      <NavBars />
      {
        loading ? (
          <p>Loaddding </p>
        ) : (
           <div id="mainSection" className="aboutSection">
        <div className="heroSection">
          <div className="banner">
            <img
              className="desktop"
              src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                aboutUsData?.DesktopBannerImagePath
              }`}
              alt="banner"
            />
            <img
              className="mobile"
              src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                aboutUsData?.MobileBannerImagePath
              }`}
              alt="banner"
            />
          </div>
          <div className="content d-flex flex-column align-items-center gap-2">
            <h1 className="text-capitalize">{aboutUsData.BannerHeading}</h1>
            <p>{aboutUsData.BannerDescription}</p>
          </div>
        </div>

        <div className="p-2 py-3  w-full mb-2">
          <img src={DottedLineGold} className="w-full" />
        </div>

        <div className="w-full h-[600px] bg-Cream flex items-center justify-center relative">
          {aboutUsData.RoadMapData?.map((roadmapdata, index) => (
            <div key={index} className="flex flex-col items-center">
              
            </div>
          ))}
        </div>

        {/* Family section Here   */}

        <div className="w-full sm:h-auto ,md:h-[500px]">
          <div className="w-[90%] h- h-full mx-auto  md:flex justify-between">
            <div className="md:w-[40%] sm:w-full sm:text-center mobile:text-center h-full flex flex-col justify-center items-start md:my-auto">
              <h1 className="py-2 text-xl sm:text-center w-full font-normal text-text_Color font-Marcellus">
                Meet My Family
              </h1>
              <h1 className="text-3xl py-3 font-roxborough text-text_Color font-medium">
                {aboutUsData.FamilyDetails_Heading}
              </h1>
              <p className="py-2 text-base font-normal text-text_Color font-Marcellus">
                {aboutUsData.FamilyDetails_Description}
              </p>
            </div>
            <div className="md:w-[50%] sm:w-[70%] sm:mt-5 mx-auto h-full">
              <img
                src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                  aboutUsData?.FamilyDetails_Images[0]?.Family_ImagePath
                }`}
                alt="family image"
                className="object-contain w-full h-[80%] "
              />
            </div>
          </div>
        </div>

        <div className="p-2 py-5  w-full mb-2">
          <img src={Flower} className="w-full object-cover" />
          {/* <RightToLeftanm image={FlowerPattern2} /> */}
        </div>
      </div>
        )
      }
     
      <Footer />
    </div>
  );
};

export default AboutUs;
