import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import NavBars from "../component/common/NavBars";
import DottedLineGold from "../assets/HomePage/DottedLineGold.png";
import Flower from "../assets/HomePage/Flower.png";
import Footer from "../component/footer/footer";
import ProductHeader from "../component/common/ProductHeader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import getToken from "../component/auth/GetToken";

const AboutUs = () => {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roadmapModal, setRoadMapModal] = useState(false);
  const [roadmapdataModal, setRoadMapDataModal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AboutUsData();
  }, []);

  
  const AboutUsData = async () => {
    try {

      const header = getToken()

      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/aboutus/getData`,
        header
      );

      console.log("About Us Data ===> ", response.data);
      setAboutUsData(response.data);
      setRoadMapDataModal(response.data.RoadMapData);
      setLoading(false);
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
        setLoading(false);
      }
    }
  };

  const getMarginTop = (index) => {
    switch (index) {
      case 0:
        return "50px";
      case 1:
        return "200px";
      case 2:
        return "300px";
      case 3:
        return "50px";
      default:
        return "0px";
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === roadmapdataModal.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? roadmapdataModal.length - 1 : prevIndex - 1
    );
  };

  const handleModalOpen = (index) => {
    setCurrentIndex(index);
    setRoadMapModal(true);
  };

  const checkHandler = () => {
    if(roadmapModal){
      setRoadMapModal(false)
    }
  }

  return (
    <div onClick={() => checkHandler()} >
      <NavBars />
      {loading ? (
        <p></p>
      ) : (
        <div id="mainSection" className="aboutSection" >
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

          <div className="w-full mobile:mt-4 mobile:mb-4 h-auto z-10 bg-Cream md:flex md:justify-between relative"  >
            {aboutUsData.RoadMapData?.map((roadmapdata, index) => (
              <div
                key={index}
                className={`flex w-full mt-[10%] ${index % 2 === 0 ? 'mobile:justify-start sm:justify-start md:justify-between' : 'mobile:justify-end sm:justify-end md:justify-between'}`}
                style={{
                  marginTop: getMarginTop(index),
                  ...(window.innerWidth <= 740 && { marginTop: "20px" }),
                }}
              >
                <div onClick={() => handleModalOpen(index)} className="">
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                      roadmapdata?.ImagePath
                    }`}
                    alt={`Roadmap Image ${index}`}
                    className="w-[250px] h-[250px] object-contain hover:scale-110 transition-transform duration-500 hover:z-50 "
                  />
                  <p className="text-center mt-2 font-roxborough text-text_Color text-2xl font-bold">
                    {roadmapdata.Heading}
                  </p>
                  <p className="text-center font-Marcellus text-text_Color">
                    {roadmapdata.Year}
                  </p>
                  <p className="text-center underline uppercase font-semibold mt-2 font-Marcellus text-text_Color2 cursor-pointer">
                    know more
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RoadMapModal open Section */}
          {roadmapModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-md mobile:w-full mobile:h-[80%] md:w-[400px] md:h-[95%] lg:h-auto">
                <div className="h-[92%]">
                {roadmapdataModal.map((data, index) => (
                  <div
                    key={index}
                    className={index === currentIndex ? "" : "hidden"}
                    style={{
                      opacity: index === currentIndex ? 1 : 0,
                      transition: "opacity 1s ease-in-out",
                      visibility: index === currentIndex ? "visible" : "hidden",
                    }}
                  >
                    <div className="flex justify-between mt-4 mobile:w-full">
                      <button onClick={handlePrev} className="mobile:w-[5%]" >
                        <FaChevronLeft size={25} />
                      </button>
                      <div className="md:w-[60%] md:h-[35%] mobile:w-[80%] md:m-auto md:mt-[3%] flex">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                            data.ImagePath
                          }`}
                          className="w-full h-full object-contain"
                          alt={`Image ${index}`}
                        />
                      </div>
                      <button onClick={handleNext} className="mobile:w-[5%]">
                        <FaChevronRight size={25} />
                      </button>
                    </div>
                    <div className="w-full text-lg mt-3">
                      <ProductHeader
                        className="text-xl md:w-[90%] mx-auto"
                        title={data.Heading}
                      />
                      <p className="md:w-[98%] text-base mt-2 font-roxborough text-text_Color font-semibold mx-auto text-center">
                        {data.Description}
                      </p>
                    </div>
                  </div>
                ))}
                </div>
                <p
                  onClick={() => setRoadMapModal(false)}
                  className="w-full uppercase underline text-text_Color2 font-Marcellus text-lg text-center mt-4 cursor-pointer"
                >
                  Close
                </p>
              </div>
            </div>
          )}

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
      )}

      <Footer />
    </div>
  );
};

export default AboutUs;
