import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { formattedAmount } from "./common/FormatAmount";
import { AiFillCloseCircle } from "react-icons/ai";
import getToken from "./auth/GetToken";
import { IoClose } from "react-icons/io5";

const ProductAddModal = ({
  productId,
  user,
  setProductModal,
  setLoadCartData,
}) => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState();
  const [packsizeProduct, setPackSizeProduct] = useState([]);
  const [selectedPackSize, setSelectedPackSize] = useState(null);
  const [inputValue, setInputValue] = useState();

  const [totalQuantity, setTotalQuantity] = useState();
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    getProductDataByID();
  }, []);

  const getProductDataByID = async () => {
    try {
      const payload = {
        product_id: productId,
        user_id: user.customer_id,
      };

      const header = getToken();

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/getproductoncart`,
        payload,
        header
      );

      console.log("product Pop Data ==> ", response.data);
      setLoading(false);
      setProductData(response.data.ProductData);
      setPackSizeProduct(response.data?.Packsize);
      setTotalQuantity(response.data.TotalQuantityInCart);
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
          toast.error(data);
          setLoading(false);
        }
      }
    }
  };

  const validateInput = (event) => {
    let inputValue = event.target.value;
    let numericValue = inputValue.replace(/[^0-9]/g, "");
    event.target.value = numericValue;
    setInputValue(numericValue);

    calculateTotalQuantity(selectedPackSize, numericValue);
  };

  const handlePackSizeSelection = (packsize) => {
    setSelectedPackSize(packsize);
    calculateTotalQuantity(packsize, inputValue);
  };

  const calculateTotalQuantity = (packsize, inputValue) => {
    if (packsize && inputValue) {
      const quantity = parseInt(inputValue);
      const totalQuantity = quantity * packsize;
      setTotalData(totalQuantity);
    } else {
      setTotalData(0);
    }
  };

  const addToCart = async () => {
    try {
      if (inputValue == null || undefined || selectedPackSize == null) {
        toast.error("Please Insert Value and Select PackSize");
      } else {
        const multipliedValue = inputValue * selectedPackSize;
        console.log("multipliedValue ===> ", multipliedValue);

        try {
          const header = getToken();

          const payload = {
            subcategory_id: productData.SubCategoryId,
            product_id: productData._id,
            quantity: multipliedValue,
            user_id: user.customer_id,
          };

          let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/add`,
            payload,
            header
          );

          console.log(response.data);

          setTotalQuantity(totalQuantity + multipliedValue);
          setLoadCartData(true);
          setProductModal(false);
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
              toast.error(data);
            }
          }
        }
      }
    } catch (error) {}
  };

  const resetCartHandler = async () => {
    try {
      const payload = {
        subcategory_id: productData.SubCategoryId,
        product_id: productData._id,
        user_id: user.customer_id,
      };

      const header = getToken();

      let response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/removeproduct`,
        payload,
        header
      );

      console.log(response.data);
      toast.success(response.data);
      setTotalQuantity(0);
      setLoadCartData(true);
      setProductModal(false);
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
          toast.error(data);
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md md:w-[65%] mobile:w-[96%] h-auto ">
        <Toaster />
        {loading ? (
          <p>wait For Data </p>
        ) : (
          <div>
            <div>
              <div className="md:w-[100%] ">
                <div className="mobile:w-[96%] md:w-[94%] mx-auto flex justify-end items-end">
                  <span className onClick={() => setProductModal(false)}>
                    <IoClose color="#60713A" size={25} />
                  </span>
                </div>
                <div className=" mobile:overflow-hidden mobile:w-[96%] mobile:mx-auto sm:mt-8 sm:overflow-hidden sm:w-[96%] sm:mx-auto md:mt-2 md:flex">
                  <div className="md:flex md:w-[35%] mobile:w-full h-[50%]">
                    <div className=" md:relative">
                      <img
                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                          productData.ProductOtherImage[0].OtherImagesName
                        }`}
                        className="mobile:h-[70%] mobile:w-[70%] mobile:mx-auto mobile:object-cover sm:h-[90%] sm:w-[70%] sm:mx-auto sm:object-cover  md:w-[350px] md:h-[250px] md:object-contain"
                        alt={`image `}
                      />
                    </div>
                  </div>
                  <div className="md:w-[100%] md:ml-[2%]">
                    <div className="flex mobile:justify-between mobile:mt-8  sm:justify-between sm:mt-6 md:mt-0 md:w-[100%] ">
                      <div className="mobile:w-[55%] sm:w-[55%]">
                        <h1 className="mobile:w-full mobile:h-full mobile:flex mobile:items-center  font-roxboroughnormal2 font-bold  sm:text-2xl mobile:text-2xl text-text_Color sm:w-full sm:h-full sm:flex sm:items-center md:text-3xl">
                          {productData.Name}{" "}
                        </h1>
                      </div>
                      <button
                        className="mobile:flex mobile:justify-end mobile:items-center mobile:px-4 mobile:p-2 sm:p-2 sm:flex sm:justify-end sm:items-center sm:mr-3 sm:px-4 border-2 border-text_Color2 uppercase rounded-3xl  font-Marcellus text-text_Color2
                     "
                        onClick={() => resetCartHandler()}
                      >
                        Reset QTY
                      </button>
                    </div>
                    <div>
                      <div className="mobile:w-[100%] sm:w-[100%]">
                        <div>
                          <h1 className="font-roxboroughnormal2 font-semibold text-lg text-text_Color">
                            Select Pack Size:
                          </h1>
                        </div>
                        <div className="mobile:w-full mobile:flex mobile:flex-row mobile:mt-2 sm:w-full sm:flex sm:flex-row sm:mt-2">
                          {packsizeProduct.map((packsize, currentIndex) =>
                            currentIndex === packsize.length ||
                            packsize.size === null ? (
                              console.log(currentIndex)
                            ) : (
                              <button
                                key={packsize._id}
                                className={`mobile:p-2  text-text_Color font-normal mobile:mr-1.5 rounded-3xl  mobile:flex mobile:w-[100%] mobile:justify-center mobile:items-center sm:p-2 sm:mr-1.5 sm:flex sm:w-[100%] sm:justify-center sm:items-center bg-Cream font-Marcellus ${
                                  selectedPackSize === packsize.size
                                    ? "bg-text_Color text-white"
                                    : ""
                                }`}
                                onClick={() =>
                                  handlePackSizeSelection(packsize.size)
                                }
                              >
                                {packsize.size} pcs ({packsize.nameConvention})
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="md:flex md:mt-3">
                        <div className="mobile:w-full mobile:flex mobile:justify-between mobile:p-2 mobile:mt-2 sm:w-full sm:flex sm:justify-between sm:p-2 sm:mt-2 md:w-[40%]">
                          <h1 className="mobile:my-auto sm:my-auto font-roxboroughnormal2 text-lg text-text_Color font-semibold">
                            Purchase Quantity:
                          </h1>
                          <div>
                            <input
                              type="text"
                              //  id={`quantity_${index}`}
                              className="p-2 border-[1px] placeholder:text-text_Color placeholder:font-Marcellus text-text_Color font-Marcellus rounded-3xl border-text_Color mobile:w-[100%] sm:w-[100%] mobile:p-2 sm:p-2"
                              //  value={quantities[index]}
                              onChange={(event) => validateInput(event)}
                              required
                            />
                          </div>
                        </div>
                        <div className="mt-1 ml-[1%] md:w-[59%] md:my-auto ">
                          <button
                            className="mobile:w-full sm:w-full mobile:p-3 sm:p-3  rounded-3xl font-Marcellus font-normal uppercase text-lg bg-text_Color2 text-white"
                            onClick={() => addToCart()}
                          >
                            ADD TO CART {totalData} PCS
                          </button>
                        </div>
                      </div>
                      <button className="mobile:w-full sm:w-full p-1  rounded-3xl mt-3 bg-Cream font-Marcellus font-normal text-base">
                        Total Units In Cart: {totalQuantity} PCS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAddModal;
