import { useEffect, useState } from "react";
// import RightToLeftText from "../style/RightToLeftText";
import RightToLeftText from "../../style/RightToLeftText";
import { AiOutlineShopping } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
// import logo from "../assets/HomePage/Frame.png";
import logo from "../../assets/HomePage/Frame.png";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";

const NavBars = () => {
  const [showNavbar, SetShowNavbar] = useState(true);
  const [showAngle, setShowAngle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  // const [firstApiCall , setFirstApiCall] = useState(true)
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllHomePageData();
  }, []);

  const mobileNavbar = () => {
    SetShowNavbar(!showNavbar);
  };

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

  const details = [
    {
      id: 1,
      title: "ABOUT",
      link: "/about",
    },
    {
      id: 2,
      title: "POLICIES",
      link: "/contactus",
    },
    {
      id: 3,
      title: "CONTACT",
      link: `/contactus`,
    },
  ];

  const getAllHomePageData = async () => {
    try {
      let allDataResponse = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/homepage/getnavbardata`
      );

      // console.log("allDataResponse.data", allDataResponse.data);

      if (allDataResponse.status === 200) {
        setCategoryData(allDataResponse.data);
        setLoading(false);
        //   setFirstApiCall(false)
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
          setLoading(false);
        }
      }
    }
  };

  const handleLinkClick = (link) => {
    navigate(link);
  };

  return (
    <div className="custom-scrollbar  ">
      <header className=" w-full left-0 z-0 top-0">
        <div className="w-[100%]">
          <RightToLeftText />
        </div>

        {loading ? (
          <p>Loading....</p>
        ) : !showNavbar ? (
          <div className="w-[100%] h-[100vh] bg-[#e9e9e9] mobile:overflow-hidden sm:overflow-hidden">
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

            <div className="p-3 font-Marcellus text-xl">
              {details.map((detail) => (
                <div
                  key={detail.id}
                  onClick={() => handleLinkClick(detail.link)}
                  className="p-1 text-bg_green hover:underline"
                >
                  <h1>{detail.title}</h1>
                </div>
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
                  <Link to={"/contactus"}>
                  <h1 className="hover:underline cursor-pointer font-semibold ">
                    CONTACT
                  </h1>
                  </Link>
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
    </div>
  );
};

export default NavBars;
