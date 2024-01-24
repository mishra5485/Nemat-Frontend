import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBars from "../component/common/NavBars";
import ProductHeader from "../component/common/ProductHeader";

const Series = () => {
  const { _id } = useParams();
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qunantityData, setQuantityData] = useState([]);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getSeriesDataById();
  }, []);

  const getSeriesDataById = async () => {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/subcategorypage/getdata/${_id}/6/0`
      );

      setSeriesData(response.data);
      setQuantityData(response.data.QuantitySchemeData);
      setProducts(response.data.SchemeProductsData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   console.log("seriesData ===> " ,  seriesData)
  console.log("products ===>", Products);
  const title = seriesData?.SubCategoriesData?.Name;

  return (
    <div>
      <div>
        <NavBars />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-8">
          <div className="w-[80%] mx-auto">
            <ProductHeader
              title={title}
              className="flex justify-center items-center"
            />
            <p className="text-center mt-4 font-Marcellus text-text_Color ">
              You can select different products in this series to avail the
              schemes below
            </p>
          </div>

          <div>{/* Bar display here  */}</div>

          <div className="w-[100%] flex flex-col justify-center items-center  mt-4 ">
            <div className="w-[90%] flex bg-LightCream  border  font-Marcellus  uppercase">
              <p className="w-[50%] text-center border-r p-3 ">
                Order Quantity
              </p>
              <p className="w-[50%] text-center p-3">Price per PC</p>
            </div>
            {qunantityData.SchemeValues.map((data, index) => (
              <div
                key={data._id}
                className="w-[90%] bg-LightCream border-l border-r font-Marcellus"
              >
                <div className="flex">
                  {data.max !== undefined ? (
                    <p className="w-[50%] text-center border-r p-1.5">{`${data.min}-${data.max} pcs`}</p>
                  ) : (
                    <p className="w-[50%] text-center border-r p-1.5 border-b">{`${data.min} & Above`}</p>
                  )}
                  {qunantityData.SchemeValues.length === index + 1 ? (
                    <p className="w-[50%] text-center p-1.5 border-b ">
                      {data.value}
                    </p>
                  ) : (
                    <p className="w-[50%] text-center p-1.5 ">{data.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div
              id="default-carousel"
              className="relative w-full"
              data-carousel="slide"
            >
              {/* <!-- Carousel wrapper --> */}
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {Products.map((product) => (
                  <div key={product._id}>
                    {product.ProductOtherImage.map((Image, index) => (
                      <div
                        key={index}
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item
                      >
                        <img
                              src={`${
                                import.meta.env.VITE_REACT_APP_BASE_URL
                              }/${Image.OtherImagesName}`}
                              className="mobile:p-2 sm:p-5 md:p-5 flex justify-center items-center"
                              
                              />
                        {console.log(
                          "Path ==> ",
                          `${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                            Image.OtherImagesName
                          }`
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* <!-- Slider indicators --> */}
              <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="true"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 3"
                  data-carousel-slide-to="2"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 4"
                  data-carousel-slide-to="3"
                ></button>
                <button
                  type="button"
                  className="w-3 h-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 5"
                  data-carousel-slide-to="4"
                ></button>
              </div>
              {/* <!-- Slider controls --> */}
              <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
