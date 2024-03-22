import { useEffect, useState } from "react";
import FooterImage from "../../assets/HomePage/FooterImage2.png";
import logo from "../../assets/loginImages/nematEnterprisesLogo.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const footer = ({check}) => {
  const { user } = useSelector((store) => store.profile);
  const _id = user?.customer_id;

  // console.log("Checking" , check);

  if(check === undefined || check === null){
    check = false;
  }

  const detailsPage = [
    {
      id: 1,
      title: "About",
      link: `/ourfamily`,
    },
    {
      id: 2,
      title: "Policies",
      link: `/policies`,
    },
    {
      id: 3,
      title: "Contact",
      link: "/contactus",
    },
    {
      id: 4,
      title: "Account",
      link: `/profile/${_id}`,
    },
  ];

  const [showAngle, setShowAngle] = useState({});
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [currentState, setCurrentState] = useState(window.innerWidth);
  const [categoryDatas, setCategoryData] = useState([]);
  // const [ FirstApiCall, setFirstApiCall] = useState(true)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { categoryData } = useSelector((store) => store.category);

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

  useEffect(() => {
    const handleResize = () => {
      setCurrentState(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // if(FirstApiCall){
    //   getAllHomePageData()
    // }
  }, [currentState]);

  useEffect(() => {
    setCategoryData(categoryData);
    setLoading(false);
  }, []);

  // const getAllHomePageData = async () => {
  //   try {
  //     let allDataResponse = await axios.get(
  //       `${import.meta.env.VITE_REACT_APP_BASE_URL}/homepage/getnavbardata`
  //     );

  //     // console.log("allDataResponse.data", allDataResponse.data);

  //     if (allDataResponse.status === 200) {
  //       setCategoryData(allDataResponse.data);
  //       setLoading(false)
  //       setFirstApiCall(false)
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       const { status, data } = error.response;

  //       if (
  //         status === 404 ||
  //         status === 403 ||
  //         status === 500 ||
  //         status === 302 ||
  //         status === 409 ||
  //         status === 401 ||
  //         status === 400
  //       ) {
  //         console.log(error.response);
  //         // toast.error(data);
  //         setLoading(false)
  //       }
  //     }
  //   }

  // };

  let isSmallScreen = currentState <= 760;

  const handleLinkClick = (link) => {
    navigate(link);
  };

  const seriesPageById = (_id) => {
    navigate(`/series/${_id}`);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          className="w-full sm:h-auto mobile:h-auto bg-center relative  flex mobile:flex-col sm:flex-col justify-center items-center "
        >
          <div className={`w-full ${check ? "bg-Cream " : ""} `}>  
            <img src={FooterImage} alt="" className="md:object-fill"/>
          </div>
          <div className="w-[100%] mobile:-mt-2 sm:-mt-2 md:-mt-2 lg:-mt-6 h-full overflow-hidden bg-text_Color2 ">
            <div className="w-full mt-2 mobile:flex sm:flex  mobile:justify-center mobile:items-center sm:items-center md:justify-center md:w-[100%] ">
              <Link to={"/home"}>
                <img src={logo} className="w-[163px] h-[100px] " />
              </Link>
            </div>

            <div className="mt-10 text-center text-white md:flex ">
              <div className="md:w-[100%] md:h-full ">
                <div className=" md:flex md:justify-between w-[94%] mx-auto">
                  {categoryDatas.map((category) => (
                    <div key={category._id} className="flex flex-col  px-2">
                      <div
                        className="flex justify-between items-center  mb-3 lg:mb-3"
                        onClick={() =>
                          isSmallScreen
                            ? toggleSubSeries(category._id)
                            : toggleSubSeries(category._id)
                        }
                      >
                        <p
                          className="font-Marcellus  text-lg  "
                          type="button"
                        >
                          {category.Name}
                        </p>
                        {isSmallScreen && (
                          <p>
                            {showAngle[category._id] ? (
                              <FaAngleUp size={20} />
                            ) : (
                              <FaAngleDown size={20} />
                            )}{" "}
                          </p>
                        )}
                      </div>

                    {/* Mobile View */}
                      {selectedSeries === category._id && (
                        <div className="z-10 ">
                          <ul className=" text-sm  mb-2  font-Marcellus text-start md:hidden">
                            {category.SubCategories &&
                              category.SubCategories.map((subcategories) => (
                                <div key={subcategories._id}
                                  className=""
                                >

                                <li
                                  
                                  className="hover:underline p-2  cursor-pointer"
                                  onClick={() =>
                                    seriesPageById(subcategories._id)
                                  }
                                  >
                                  {subcategories.Name}
                                </li>
                                </div>
                              ))}
                          </ul>
                        </div>
                      )}

                      <div className="sm:hidden mobile:hidden md:flex">
                        <ul className=" text-base  mb-2 font-Marcellus  text-start ">
                          {category.SubCategories &&
                            category.SubCategories.map((subcategories) => (
                              <li
                                key={subcategories._id}
                                className="hover:underline py-1.5 cursor-pointer text-LightCream opacity-70"
                                onClick={() =>
                                  seriesPageById(subcategories._id)
                                }
                              >
                                {/* <Link to={subcategories._id} className=""> */}
                                {subcategories.Name}
                                {/* </Link> */}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* {Details Page Link } */}
                <div className="md:flex justify-between md:border-t-2  md:w-[94%] mobile:w-[94%] mx-auto">
                  <div className="flex justify-between border-t-[1px] border-b-[1px] border-opacity-10 md:border-none mt-3 border-[#FFFBF0] font-Marcellus ">
                    {detailsPage.map((text) => (
                      <div key={text.id} className="flex  py-5">
                        <h1
                          onClick={() => handleLinkClick(text.link)}
                          className="md:px-3 cursor-pointer"
                        >
                          {text.title}
                        </h1>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <h1 className="py-6 font-Marcellus">
                      Copyright © Nemat Enterprises Pvt. Ltd.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default footer;
