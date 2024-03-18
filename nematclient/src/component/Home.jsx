import { useEffect, useRef, useState } from "react";
import DottedLineGold from "../assets/HomePage/DottedLineGold.png";
import { useMediaQuery } from "react-responsive";
import Goldenline from "../style/goldenline";
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
import NavBars from "./common/NavBars";
import { useNavigate } from "react-router-dom";
import Flower from "../assets/HomePage/Flower.png";
import { useDispatch } from "react-redux";
import { setCategoryDataStore } from "../slices/categorySlice";

import getToken from "./auth/GetToken";




const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const [firstApiCall, setFirstApiCall] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  // const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [loading, setLoading] = useState(true);
  const [BannerData, setBannerData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Dssprays, setDsSprays] = useState();
  const [agarbattisDs, setAgarbattisDs] = useState();
  const [isModalOpen , setIsModalOpen] = useState(false);

  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    // Automatically change banner after 10 seconds
    const changeBanner = () => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % BannerData.length;
        sliderRef.current.slickGoTo(nextSlide);
      }
    };

    const timeoutId = setTimeout(changeBanner, 3000);

    if (firstApiCall) {
      getAllHomePageData();
    }

    return () => clearTimeout(timeoutId);
  }, [currentSlide, BannerData.length]);
  
  
 useEffect(() => {
  const modalDisplayedBefore = sessionStorage.getItem('modalDisplayed');
  
  if (modalDisplayedBefore !== 'true') {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
       sessionStorage.setItem('modalDisplayed', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  } else {
    setIsModalOpen(false);
  }
}, []);

  
  const getAllHomePageData = async () => {
    try {
      const header = getToken()
      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/homepage/getdata`,
        header
      );

      // console.log("allDataResponse.data", allDataResponse.data);

      if (allDataResponse.status === 200) {
        setCategoryData(allDataResponse.data.CategoryData);
        const checkDS = allDataResponse.data.CartDiscountSchemeData;
        setDsSprays(checkDS[0]);
        setAgarbattisDs(checkDS[1]);
        setBannerData(allDataResponse.data.BannerData);
        setLoading(false);
        setFirstApiCall(false);
        console.log(allDataResponse.data.CategoryData);
        dispatch(setCategoryDataStore(allDataResponse.data.CategoryData));
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

  const seriesPageById = (_id) => {
    navigate(`/series/${_id}`);
  };

  

  return (
     <div className="mt-0 overflow-auto custom-scrollbar">
      {!loading && <NavBars />}
      
      {!loading && (
        <div className="relative">
          <Slider {...settings} ref={sliderRef} className="overflow-hidden z-10 cursor-pointer">
            {BannerData.map((bannerItem) => (
              <div key={bannerItem._id} className="w-full h-[85vh] object-cover sm:bg-center overflow-hidden relative" onClick={() => seriesPageById(bannerItem.SubcategoryId)}>
                <img src={`${baseURL}/${isMobile ? bannerItem.MobilebannerImage : bannerItem.DesktopbannerImage}`} alt={bannerItem.Heading} className="w-full h-full object-cover" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              </div>
            ))}
          </Slider>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex space-x-2  ">
              {[...Array(3)].map((_, dotIndex) => (
                <span key={dotIndex} className={`h-2 w-2 rounded-full bg-black ${dotIndex === currentSlide % 3 ? "opacity-100" : "opacity-50"}`} onClick={() => sliderRef.current && sliderRef.current.slickGoTo(currentSlide + dotIndex)}></span>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <div>
          {categoryData.map((category, index) => (
            <div key={index}>
              <div key={index} className={`p-2 py-5 w-full mb-2 ${index % 2 === 0 ? "" : ""}`}>
                <img src={index % 2 === 0 ? DottedLineGold : Flower} className="w-full" />
              </div>
              <div key={category._id}>
                <ProductHeader title={category.Name} />
                <div className="w-full flex justify-center items-center mt-8">
                  <div className="w-[90%] sm:grid-cols-3 sm:grid mobile:grid mobile:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mx-auto">
                    {category.SubCategories && category.SubCategories.map((subcategories) => (
                      <div key={subcategories._id} className="flex w-full flex-col justify-center cursor-pointer gap-y-3 items-center mb-2 " onClick={() => seriesPageById(subcategories._id)}>
                        <div className="">
                          <img src={`${baseURL}/${subcategories.Image}`} className="hover:scale-110 transition-transform duration-300 mobile:p-2 sm:p-5 md:p-5 flex justify-center md:h-[400px] lg:h-[370px] object-contain mobile:h-[250px] items-center" alt={subcategories?.title} />
                          <h1 className="font-roxborough text-xl text-center w-full text-text_Color mb-4 overflow-hidden overflow-ellipsis" style={{ minHeight: "3em" }}>{subcategories.Name}</h1>
                        </div>
                        <button className="w-[137px] uppercase h-[43px] hover:bg-[#293821] bg-bg_green rounded-3xl font-Marcellus text-white mb-7">Order NOW</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && <Discountslabe Dssprays={Dssprays} agarbattisDs={agarbattisDs} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}

      {isModalOpen && !loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 my-auto flex items-center justify-center z-50">
          <Discountslabe Dssprays={Dssprays} agarbattisDs={agarbattisDs} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
      )}

      {!loading && <Footer categoryData={categoryData} />}
    </div>
  );
};

export default Home;
