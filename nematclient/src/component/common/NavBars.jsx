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
import { useSelector } from "react-redux";
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/profileSlice";
import { BiSolidUser } from "react-icons/bi";
import { RxExit } from "react-icons/rx";
import { setcategoryEmpty } from "../../slices/categorySlice";

const NavBars = () => {
  const [showNavbar, SetShowNavbar] = useState(true);
  const [showAngle, setShowAngle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  // const [firstApiCall , setFirstApiCall] = useState(true)
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [categoryDatas, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isHovereds, setIsHovereds] = useState(false);

  const { user } = useSelector((store) => store.profile);
  const { categoryData } = useSelector((store) => store.category);
  const _id = user?.customer_id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("User=========> Navbar" , user)

  // useEffect(() => {
  //   // getAllHomePageData();
  // }, []);

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
      link: "/ourfamily",
    },
    {
      id: 2,
      title: "POLICIES",
      link: "/policies",
    },
    {
      id: 3,
      title: "CONTACT",
      link: `/contactus`,
    },
  ];

  const profileHandler = () => {
    navigate(`/profile/${_id}`);
    setIsHovered(false);
  };

  useEffect(() => {
    setCategoryData(categoryData);
    setLoading(false);
  }, [categoryDatas]);

  // const getAllHomePageData = async () => {
  //   try {
  //     let allDataResponse = await axios.get(
  //       `${import.meta.env.VITE_REACT_APP_BASE_URL}/homepage/getnavbardata`
  //     );

  //     // console.log("allDataResponse.data", allDataResponse.data);

  //     if (allDataResponse.status === 200) {
  //       setCategoryData(allDataResponse.data);
  //       setLoading(false);
  //       //   setFirstApiCall(false)
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
  //         setLoading(false);
  //       }
  //     }
  //   }
  // };

  const handleLinkClick = (link) => {
    navigate(link);
  };

  const seriesPageById = (_id) => {
    navigate(`/series/${_id}`);
    setIsHovered(false);
  };

  const logoutHandler = async () => {
    dispatch(setcategoryEmpty());
    dispatch(logout());
  };


   useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingUp(currentScrollPos < prevScrollPos && currentScrollPos > 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`w-full  bg-LightCream left-0 z-40 top-0 ${isScrollingUp  ? "fixed" : ""} transition-transform duration-300`}
    >
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
                <CgProfile size={30} />
              </div>
              <div className="w-[143px] h-[66px]">
                <Link to={"/home"}>
                  <img src={logo} className="w-full h-full " />
                </Link>
              </div>
              <IoIosCloseCircleOutline size={30} onClick={mobileNavbar} />
            </div>
            <hr />

            <div>
              {categoryDatas.map((category) => (
                <div key={category._id} className="flex flex-col ">
                  <div
                    className="flex justify-between items-center p-3 "
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
                      <ul className="py-2 text-base pl-3 font-Marcellus text-text_Color">
                        {category.SubCategories &&
                          category.SubCategories.map((subcategories) => (
                            <li
                              key={subcategories._id}
                              className="hover:underline"
                              onClick={() => seriesPageById(subcategories._id)}
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
                  <Link to={"/search"}>
                  <IoSearchOutline size={30} color="" />
                  </Link>
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
                  <Link to={"/ourfamily"}>
                    <h1 className="hover:underline cursor-pointer font-semibold">
                      ABOUT
                    </h1>
                  </Link>
                  <Link to={"/contactus"}>
                    <h1 className="hover:underline cursor-pointer font-semibold ">
                      CONTACT
                    </h1>
                  </Link>
                </div>

                <div className="w-[143px] h-[66px]">
                  <Link to={"/home"}>
                    <img src={logo} className="w-full h-full " />
                  </Link>
                </div>
                <div className="md:hidden" onClick={mobileNavbar}>
                  {showNavbar ? <GiHamburgerMenu size={30} color="" /> : null}
                </div>
                <div className="flex items-center gap-x-4 sm:hidden mobile:hidden md:flex lg:flex font-Marcellus text-text_Color">
                  <Link to={"/policies"}>
                    <h1 className="cursor-pointer font-semibold">POLICIES</h1>
                  </Link>
                  <Link>
                  <Link to={"/search"}>
                    <IoSearchOutline
                      size={25}
                      color=""
                      />
                  </Link>
                  </Link>
                  <Link to={"/cart"}>
                    <AiOutlineShopping size={25} />
                  </Link>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowTooltip(true)}
                  >
                    <Link className="profile-link">
                      <CgProfile size={25} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile on Hover  */}
            <div
              className=" z-40 flex  justify-end items-end w-[90%] mx-auto "
              onMouseLeave={() => setShowTooltip(false)}
            >
              {showTooltip && (
                <div className="">
                  <div
                    className="flex cursor-pointer "
                    onClick={() => profileHandler()}
                  >
                    <BiSolidUser className="my-auto mr-2" size={15} />
                    <button
                      type="button"
                      className="cursor-pointer text-lg font-Marcellus"
                    >
                      Profile
                    </button>
                  </div>
                  <div className="flex cursor-pointer">
                    <RxExit className="my-auto mr-2" size={15} />
                    <p
                      className="cursor-pointer text-lg font-Marcellus"
                      onClick={() => setIsModal(true)}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>

            {isModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-md w-[300px] h-auto ">
                  <ImExit
                    size={25}
                    className="w-full mx-auto text-text_Color"
                  />
                  <h1 className="w-[80%] mt-2.5 text-center mx-auto text-xl text-text_Color font-roxborough">
                    Are you sure you want to log out?
                  </h1>
                  <div className="w-[90%] flex justify-between gap-x-2 mt-3 mx-auto font-Marcellus">
                    <button
                      onClick={() => setIsModal(false)}
                      className="uppercase p-2 border border-text_Color2 text-text_Color2 rounded-3xl w-[50%]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => logoutHandler()}
                      className="uppercase p-2 bg-text_Color2 text-white rounded-3xl w-[50%]"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Shop On Hover  */}
            {isHovered ? (
              <div
                className=" w-full bg-LightCream h-auto flex justify-center z-20"
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="flex w-[90%] justify-between ">
                  {categoryDatas.map((category) => (
                    <div
                      key={category._id}
                      className="flex  flex-col overflow-hidden"
                    >
                      <div className="flex justify-between items-center p-3 ">
                        <h1
                          className=" font-Marcellus text-text_Color2 text-xl  "
                          style={{ minHeight: "3em" }}
                        >
                          {category.Name}
                        </h1>
                      </div>

                      <div className="pl-3 h-auto">
                        <ul className="py-2 text-base font-Marcellus text-text_Color ">
                          {category.SubCategories &&
                            category.SubCategories.map((subcategories) => (
                              <li
                                key={subcategories._id}
                                className="hover:underline cursor-pointer"
                                onClick={() =>
                                  seriesPageById(subcategories._id)
                                }
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
    </header>
  );
};

export default NavBars;
