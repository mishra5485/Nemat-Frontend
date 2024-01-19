import { useEffect, useRef, useState } from "react";
import RightToLeftText from "../style/RightToLeftText";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import logo from "../assets/HomePage/Frame.png";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileBG from "../assets/HomePage/mobileBG.png";
import DottedLineGold from "../assets/HomePage/DottedLineGold.png";
import DesktopBG from "../assets/HomePage/desktopBG.png";
import { useMediaQuery } from "react-responsive";
import Goldenline from "../style/goldenline";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import Discountslabe from "./products/Discountslabe";
import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import RightToLeftanm from "../style/RightToLeftanm";
import Footer from "./footer/footer";
import "../App.css";
import axios from "axios";
import ProductHeader from "./common/ProductHeader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const [firstApiCall , setFirstApiCall] = useState(true)
  const [showAngle, setShowAngle] = useState({});
  const [showNavbar, SetShowNavbar] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [loading, setLoading] = useState(true);
  const [BannerData , setBannerData] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Dssprays , setDsSprays] = useState()
  const [agarbattisDs , setAgarbattisDs] = useState();
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const mobileNavbar = () => {
    SetShowNavbar(!showNavbar);
  };

  const details = [
    {
      id: 1,
      title: "ABOUT",
      link: `https://nemat.digitalcube.tech/nemat/about`,
    },
    {
      id: 2,
      title: "POLICIES",
      link: "",
    },
    {
      id: 3,
      title: "CONTACT",
      link: "",
    },
  ];

  const [selectedSeries, setSelectedSeries] = useState(null);

  const toggleSubSeries = (seriesId) => {
    setSelectedSeries((prevSelectedSeries) =>
      prevSelectedSeries === seriesId ? null : seriesId
    );

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

  // useEffect(() => {
  //   // const handleScroll = () => {
  //   //   const currentScrollPos = window.pageYOffset;
  //   //   const isScrolledUp = prevScrollPos > currentScrollPos;

  //   //   setIsNavVisible(isScrolledUp || currentScrollPos < 0); // Show navbar when at the top

  //   //   setPrevScrollPos(currentScrollPos);
  //   // };

   
  //   // window.addEventListener('scroll', handleScroll);
  //   // return () => {
  //   //   window.removeEventListener('scroll', handleScroll);
  //   // };
  // }, []);

   useEffect(() => {
    // Automatically change banner after 10 seconds
    const changeBanner = () => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % BannerData.length;
        sliderRef.current.slickGoTo(nextSlide);
      }
    };

    const timeoutId = setTimeout(changeBanner, 3000);

    

    if(firstApiCall){
       getAllHomePageData();
    }

    return () => clearTimeout(timeoutId);

  }, [currentSlide, BannerData.length]);


  const getAllHomePageData = async () => {
    try {
      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/homepage/getdata`
      );

      console.log("allDataResponse.data", allDataResponse.data);

      if (allDataResponse.status === 200) {
        setCategoryData(allDataResponse.data.CategoryData);
        const checkDS = allDataResponse.data.CartDiscountSchemeData
        setDsSprays(checkDS[0])
        setAgarbattisDs(checkDS[1])
        setBannerData(allDataResponse.data.BannerData)
        setLoading(false);
        setFirstApiCall(false)
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          console.log(error.response);
          // toast.error(data);
        }
      }
    }
    
  };

  // console.log("show data =====>", showdata)
  



 const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    autoplay: true,
    autoplaySpeed: 10000, // 10 seconds
    beforeChange: (current, next) => {
    // If transitioning from the last to the first slide
    if (next === 0 && current === BannerData.length - 1) {
      // Move the first slide to the right
      const slider = sliderRef.current;
      if (slider) {
        slider.slickGoTo(current + 1);
      }
    }
  },
  };

  return (
    <div className="mt-0  overflow-auto custom-scrollbar">
      <header className=" w-full left-0 z-0 top-0">
        <div className="w-[100%]">
          <RightToLeftText />
        </div>

        {!showNavbar ? (
          <div className="w-[100%] h-[100vh] bg-[#e9e9e9]">
            <div className=" w-full flex  flex-nowrap justify-between  items-center  p-4">
              <div className="flex gap-3">
                <AiOutlineShopping
                  size={30}
                  onClick={() => navigate("/cart")}
                />
                <CgProfile onClick={() => navigate("/login")} size={30} />
              </div>
              <div className="w-[143px] h-[66px]">
                <img src={logo} className="w-full h-full " />
              </div>
              <IoIosCloseCircleOutline size={30} onClick={mobileNavbar} />
            </div>
            <hr />

            <div>
              {categoryData.map((category) => (
                <div key={category._id} className="flex flex-col ">
                  <div
                    className="flex justify-between items-center p-3"
                    onClick={() => toggleSubSeries(category._id)}
                  >
                    <button
                      className="font-Marcellus text-text_Color text-2xl hover:underline "
                      type="button"
                    >
                      {category.Name}
                    </button>
                    {
                      <p>
                        {showAngle[category._id] ? (
                          <FaAngleUp size={20} />
                        ) : (
                          <FaAngleDown size={20} />
                        )}{" "}
                      </p>
                    }
                  </div>

                  {selectedSeries === category._id && (
                    <div className="z-10 ">
                      <ul className="py-2 text-base pl-3 font-Marcellus text-text_Color  ">
                        {category.SubCategories &&
                          category.SubCategories.map((subcategories) => (
                            <li
                              key={subcategories._id}
                              className="hover:underline"
                            >
                              <Link to={subcategories.link} className="">
                                {subcategories.Name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 font-Marcellus  text-xl ">
              {details.map((detail) => (
                <a
                  key={detail.id}
                  href={detail.link}
                  className="p-1 text-bg_green hover:underline "
                >
                  <h1>{detail.title}</h1>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div
              className={`relative py-4 check ${
                isHovered ? "bg-LightCream" : ""
              } z-50`}
            >
              <div
                className="w-[100%] md:w-[90%] flex flex-nowrap justify-between  items-center  m-auto px-5 relative "
                onS
              >
                <div className="md:hidden">
                  <IoSearchOutline size={30} color="" />
                </div>
                <div className="flex gap-x-4 sm:hidden mobile:hidden md:flex lg:flex  font-Marcellus relative ">
                  <h1
                    className="flex items-center relative hover:underline cursor-pointer font-semibold"
                    onMouseEnter={() => setIsHovered(true)}
                  >
                    SHOP
                    <span className="p-1 mt-[2px] ">
                      {" "}
                      {isHovered ? (
                        <FaAngleUp size={15} />
                      ) : (
                        <FaAngleDown
                          size={15}
                          onClick={() => setIsHovered(false)}
                        />
                      )}
                    </span>
                  </h1>
                  <h1 className="hover:underline cursor-pointer font-semibold">
                    ABOUT
                  </h1>
                  <h1 className="hover:underline cursor-pointer font-semibold ">
                    CONTACT
                  </h1>
                </div>

                <div className="w-[143px] h-[66px]">
                  <img src={logo} className="w-full h-full " />
                </div>
                <div className="md:hidden" onClick={mobileNavbar}>
                  {showNavbar ? <GiHamburgerMenu size={30} color="" /> : null}
                </div>
                <div className="flex items-center gap-x-4 sm:hidden mobile:hidden md:flex lg:flex font-Marcellus text-text_Color">
                  <h1 className="cursor-pointer font-semibold">POLICIES</h1>
                  <Link>
                    <IoSearchOutline size={25} color="" />
                  </Link>
                  <Link to={"/cart"}>
                    <AiOutlineShopping size={25} />
                  </Link>
                  <Link to={"/login"}>
                    <CgProfile size={25} />
                  </Link>
                </div>
              </div>
            </div>
            {isHovered ? (
              <div
                className="absolute w-full bg-LightCream  flex justify-center z-20"
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex w-[90%] justify-between ">
                  {categoryData.map((category) => (
                    <div key={category._id} className="flex  flex-col">
                      <div className="flex justify-between items-center p-3 cursor-pointer">
                        <h1
                          className=" font-Marcellus text-text_Color text-2xl hover:underline"
                          style={{ minHeight: "3em" }}
                        >
                          {category.Name}
                        </h1>
                      </div>

                      <div className="pl-3 h-[70%]">
                        <ul className="py-2 text-base font-Marcellus text-text_Color ">
                          {category.SubCategories &&
                            category.SubCategories.map((subcategories) => (
                              <li
                                key={subcategories._id}
                                className="hover:underline cursor-pointer"
                              >
                                {subcategories.Name}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </header>
      {loading ? (
        <p>Loading </p>
      ) : (
        <div className="relative">
      <Slider {...settings} ref={sliderRef} className="overflow-hidden z-10">
        {BannerData.map((bannerItem) => (
          <div
            key={bannerItem._id}
            className="w-full h-[85vh] object-cover sm:bg-center overflow-hidden relative"
          >
            <img
              src={`${baseURL}/${
                isMobile ? bannerItem.MobilebannerImage : bannerItem.DesktopbannerImage
              }`}
              alt={bannerItem.Heading}
              className="w-full h-full object-cover"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <h1 className="font-Abel md:text-start font-[25px] text-2xl">
                {bannerItem.Heading}
              </h1>
              <h1 className="font-Abel font-[35px] text-3xl overflow-hidden">
                {bannerItem.SubHeading}
              </h1>
              <p className="w-[80%] md:w-[350px] md:text-start mobile:text-center font-Marcellus text-base">
                {bannerItem.Description}
              </p>
              <button className="w-[137px] h-[43px] bg-bg_green rounded-3xl">
                SHOP NOW
              </button>
            </div> */}
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex space-x-2 ">
          {[...Array(3)].map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={`h-2 w-2 rounded-full bg-black ${
                dotIndex === currentSlide % 3 ? "opacity-100" : "opacity-50"
              }`}
              onClick={() =>
                sliderRef.current && sliderRef.current.slickGoTo(currentSlide + dotIndex)
              }
            ></span>
          ))}
        </div>
      </div>
        </div>
      )}
      <div>
        {loading ? (
          <p>Loading </p>
        ) : (
          <div>
            {categoryData.map((category, index) => (
              <>
                {index % 2 == 0 ? (
                  <div className="p-2  w-full mb-2">
                    <Goldenline image={DottedLineGold} />
                  </div>
                ) : (
                  <div className="p-2  w-full mb-2">
                    <RightToLeftanm image={FlowerPattern2} />
                  </div>
                )}
                <div key={category._id}>
                  <ProductHeader title={category.Name} />
                  <div className="w-full flex justify-center items-center mt-8">
                    <div className="w-[90%] sm:grid-cols-3 sm:grid mobile:grid mobile:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto">
                      {category.SubCategories &&
                        category.SubCategories.map((subcategories) => (
                          <div
                            key={subcategories._id}
                            className="flex w-full flex-col justify-center gap-y-3 items-center mb-2"
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_REACT_APP_BASE_URL
                              }/${subcategories.Image}`}
                              className="mobile:p-2 sm:p-5 md:p-5 flex justify-center items-center"
                              alt={subcategories?.title}
                            />
                            <h1
                              className="font-roxborough text-xl text-center w-full text-text_Color mb-4 overflow-hidden overflow-ellipsis"
                              style={{ minHeight: "3em" }}
                            >
                              {subcategories.Name}
                            </h1>
                            <button className="w-[137px] h-[43px] bg-bg_green rounded-3xl font-Marcellus text-white mb-7">
                              SHOP NOW
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>

      {/*  
      <Attars/>
      <RightToLeftanm image={FlowerPattern2}/>
      <Rollons/>
      <Goldenline image={DottedLineGold}  />
      <Non_Alcoholic/>
      <RightToLeftanm image={FlowerPattern2}/>
      <Agarabtti/> */}
      {console.log("Dssprays ==>" , Dssprays)}
      {console.log("agarbattisDs ==>" , agarbattisDs)}
      {loading ? <p>Loading </p> : (
        <>
        {/* {console.log("Dssprays ==>" , Dssprays)}
        {console.log("agarbattisDs ==>" , agarbattisDs)} */}
      <Discountslabe  Dssprays = {Dssprays} agarbattisDs={agarbattisDs}/>
      </>
      )}
        
      {loading ? <p>Loading </p> : <Footer categoryData={categoryData} />}
    </div>
  );
};

export default Home;
