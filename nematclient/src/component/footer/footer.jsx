import { useEffect, useState } from "react";
import FooterImage from "../../assets/HomePage/FooterImage.png";
import logo from "../../assets/loginImages/nematEnterprisesLogo.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const footer = ({ categoryData }) => {
  console.log("categoryData Data inside Footer", categoryData);

  const detailsPage = [
    {
      id:1,
      title:"About",
      link:`https://nemat.digitalcube.tech/nemat/about`
    },
    {
      id:1,
      title:"Policies",
      link:`https://nemat.digitalcube.tech/nemat/about`
    },
    {
      id:1,
      title:"Contact",
      link:`https://nemat.digitalcube.tech/nemat/about`
    },
    {
      id:1,
      title:"Account",
      link:`https://nemat.digitalcube.tech/nemat/about`
    },
  ]

  const [showAngle, setShowAngle] = useState({});
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [currentState, setCurrentState] = useState(window.innerWidth);

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
  }, [currentState]);

  let isSmallScreen = currentState <= 760;


  


  return (
    <div
      style={{
        backgroundImage: `url(${FooterImage})`,
        backgroundRepeat: "no-repeat",
      }}
      className="w-full sm:h-auto mobile:h-auto  bg-center flex mobile:flex-col sm:flex-col justify-center items-center bg-Cream bg-cover"
    >
      <div className="w-[90%] h-full overflow-hidden  ">
        <div className="w-full mobile:h-[20%] mobile:mt-[30%] sm:mt-[18%]  mobile:flex sm:flex mobile:justify-center mobile:items-center sm:items-center md:justify-center md:w-[100%] ">
          <img src={logo} className="w-[163px] h-[100px] " />
        </div>

        <div className="mt-10 text-center text-white md:flex ">
          <div className="md:w-[100%] md:h-full ">
            <div className=" md:flex md:justify-between">
              {categoryData.map((category) => (
                <div key={category._id} className="flex flex-col mb-3 px-2">
                  <div
                    className="flex justify-between items-center pb-1 mb-7 lg:mb-3"
                    onClick={() =>
                      isSmallScreen
                        ? toggleSubSeries(category._id)
                        : toggleSubSeries(category._id)
                    }
                  >
                    <button
                      className="font-Marcellus  text-lg hover:underline "
                      type="button"
                    >
                      {category.Name}
                    </button>
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

                  {selectedSeries === category._id && (
                    <div className="z-10 ">
                      <ul className=" text-sm pl-2 mb-2 font-Marcellus  text-start md:hidden">
                        {category.SubCategories &&
                          category.SubCategories.map((subcategories) => (
                            <li
                              key={subcategories.Name}
                              className="hover:underline p-3"
                            >
                              <Link to={subcategories._id} className="">
                                {subcategories.Name}
                              </Link>
                            </li>
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
                            className="hover:underline"
                          >
                            <Link to={subcategories._id} className="">
                              {subcategories.Name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
              
            {/* {Details Page Link } */}
            <div className="md:flex justify-between md:border-t-2 ">

            <div className="flex justify-between border-t-2 border-b-2   md:border-none mt-3 border-[#FFFBF0] font-Marcellus " >
                {
                  detailsPage.map((text) => (
                    <div key={text.id} className="flex  py-5">

                        <h1 className="md:px-3">{text.title}</h1>
                    </div>
                  ))
                }
            </div>

             <div className="mt-2">
              <h1 className="py-6 font-Marcellus">Copyright © Nemat Enterprises Pvt. Ltd.</h1>
             </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
