  import axios from "axios";
  import React, { useEffect, useRef, useState } from "react";
  import { useParams } from "react-router-dom";
  import NavBars from "../component/common/NavBars";
  import ProductHeader from "../component/common/ProductHeader";
  import { FaAngleLeft , FaAngleRight } from "react-icons/fa";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import { useSliderRefs } from "../hooks/useSliderRefs";
  import Footer from "../component/footer/footer";

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

      console.log("seriesData ===> " ,  seriesData)
    // console.log("products ===>", Products);
    const title = seriesData?.SubCategoriesData?.Name;

    const sliderRefs = useSliderRefs(Products?.length);

    const handleNext = (index) => {
      sliderRefs[index].slickNext();
    };

    const handlePrev = (index) => {
      sliderRefs[index].slickPrev();
    };

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div>
        <div>
          <NavBars />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-8 mb-8">
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

            {/* <!-- Carousel wrapper --> */}

            <div>
              {Products?.map((product, index) => (
                <div key={product._id} className="mt-8 overflow-hidden w-[90%] mx-auto">
                  <Slider
                    ref={(slider) => (sliderRefs[index] = slider)}
                    {...settings}
                    className="overflow-hidden "
                  >
                    {product.ProductOtherImage.map((images, imageIndex) => (
                      <div key={imageIndex} className="mt-8 ">
                        <img
                          src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                            images.OtherImagesName
                          }`}
                          className="h-[90%] w-[70%] mx-auto object-cover"
                          alt={`Slide ${imageIndex + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>

                  {/* External Buttons */}
                  <div className="flex absolute mt-[-50%] w-[90%] mx-auto">
                    <button
                      onClick={() => handlePrev(index)}
                      className="custom-prev-button ml-[3%]"
                    >
                      <FaAngleLeft />
                    </button>
                    <button
                      onClick={() => handleNext(index)}
                      className="custom-next-button w-full flex justify-end mr-[3%]"
                    >
                      <FaAngleRight />
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-[60%]">
                      <h1 className="w-full flex items-center">{product.Name} <span className=" ml-2 px-2.5 bg-text_Color text-white rounded-xl  ">i</span></h1>
                    </div>
                    <button className="flex justify-end items-center">
                      Reset
                    </button>
                  </div>

                  <div className="w-[100%]">
                        <div>
                          <h1>Select Pack Size:</h1>
                        </div>
                        <div className="w-full flex flex-row mt-2">
                          {
                            seriesData.SubCategoriesData.PackSizes.map((packsize) => (
                              <button key={packsize._id} className="p-2  border-2 mr-1.5 rounded-3xl flex w-[100%] justify-center items-center">
                                {packsize.size}
                              </button>
                            ))
                          }
                        </div>
                  </div>
                  <div className="w-full flex justify-between p-2 mt-2">
                    <h1 className="my-auto">Purchase Quantity:</h1>
                    <div>
                        <input 
                        type="text"
                        id="quantity"
                        className="p-2 border-2 rounded-3xl"
                        />
                    </div>
                  </div>
                  <div className="mt-1">
                    <button className="w-full p-3 border-2 rounded-3xl">
                      ADD TO CART - 
                    </button>
                    <button className="w-full p-1 border-2 rounded-3xl mt-3">
                      Total Units In Cart:
                    </button>
                  </div>
                </div>
  
              ))} 
            </div>
          </div>
        )}
        <Footer/>
      </div>
    );
  };

  export default Series;
