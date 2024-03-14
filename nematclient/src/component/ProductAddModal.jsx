import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { formattedAmount } from "./common/FormatAmount";
import { AiFillCloseCircle } from "react-icons/ai";
import getToken from "./auth/GetToken";

const ProductAddModal = ({ productId, user, setProductModal , setLoadCartData }) => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState();
  const [packsizeProduct, setPackSizeProduct] = useState([]);
  const [selectedPackSize, setSelectedPackSize] = useState(null);
  const [inputValue, setInputValue] = useState();

  const [totalQuantity, setTotalQuantity] = useState();
  const [totalData , setTotalData] = useState(0)

  useEffect(() => {
    getProductDataByID();
  }, []);

  const getProductDataByID = async () => {
    try {
      const payload = {
        product_id: productId,
        user_id: user.customer_id,
      };

      const header = getToken()

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

          const header = getToken()

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

          setTotalQuantity(totalQuantity + multipliedValue)
          setLoadCartData(true)
          setProductModal(false)

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
        subcategory_id:productData.SubCategoryId,
         product_id: productData._id,
          user_id: user.customer_id,
      }

      const header = getToken()

      let response = await axios.post(
         `${import.meta.env.VITE_REACT_APP_BASE_URL}/cart/removeproduct`,
            payload,
            header
      )

      console.log(response.data);
      toast.success(response.data)
      setTotalQuantity(0)
      setLoadCartData(true)
      setProductModal(false)

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

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md w-[550px] h-auto ">
        <Toaster />
        {loading ? (
          <p>wait For Data </p>
        ) : (
          <div className="h-auto">
            <div className="">
              <h1 className="text-2xl font-Marcellus text-text_Color flex justify-between items-center mr-2 mb-2 ">
                {productData.Name}{" "}
                <span>
                  <AiFillCloseCircle
                    size={25}
                    onClick={() => setProductModal(false)}
                  />
                </span>
              </h1>
              <div className="mobile:flex  mobile:h-[300px] sm:flex sm:h-[300px]">
                <div className="mobile:w-[38%] sm:w-[38%] h-[100%] mr-3 flex ">
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/${
                      productData.ProductOtherImage[0].OtherImagesName
                    }`}
                    className="mobile:w-full mobile:h-full mobile:object-contain sm:w-full sm:h-full sm:object-contain "
                  />
                </div>
                <div
                  className="mobile:w-[60%]  cursor-pointer font-Marcellus text-text_Color font-medium mobile:h-full  sm:w-[60%] sm:h-full "
                  // onClick={() => handlerPopProduct(cartProduct.product_id)}
                >
                  <div className="flex justify-end items-end">
                    <button className="p-2 w-[50%] border-2 border-text_Color rounded-3xl "
                      onClick={() => resetCartHandler()}
                    >
                      Reset Qty
                    </button>
                  </div>
                  <div>
                    <p>Select Pack Size</p>
                    <div className="mobile:w-full mobile:flex mobile:flex-row mobile:mt-2 sm:w-full sm:flex sm:flex-row sm:mt-2">
                      {packsizeProduct.map((packsize, currentIndex) =>
                        currentIndex === packsize.length ||
                        packsize.size === null ? (
                          console.log(currentIndex)
                        ) : (
                          <button
                            key={packsize._id}
                            className={`mobile:p-2 border-2 mobile:mr-1.5 rounded-3xl mobile:flex mobile:w-[100%] mobile:justify-center mobile:items-center sm:p-2 sm:mr-1.5 sm:flex sm:w-[100%] sm:justify-center sm:items-center bg-Cream font-Marcellus ${
                              selectedPackSize === packsize.size
                                ? "bg-text_Color text-white"
                                : ""
                            }`}
                            onClick={() =>
                              handlePackSizeSelection(packsize.size)
                            }
                          >
                            {packsize.size}
                          </button>
                        )
                      )}
                    </div>
                    <div className="mobile:w-full mobile:flex mobile:justify-between mobile:p-2 mobile:mt-2 sm:w-full sm:flex sm:justify-between sm:p-2 sm:mt-2 md:w-full">
                      <h1 className="mobile:my-auto sm:my-auto font-roxborough text-text_Color font-semibold">
                        Purchase Quantity:
                      </h1>
                      <div>
                        <input
                          type="text"
                          //  id={`quantity_${index}`}
                          className="p-2 border-2 rounded-3xl mobile:w-[100%] sm:w-[100%] mobile:p-2 sm:p-2"
                          //  value={quantities[index]}
                          onChange={(event) => validateInput(event)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-1  md:w-[100%] md:my-auto ">
                      <button
                        className="mobile:w-full sm:w-full mobile:p-3 sm:p-3 border-2 rounded-3xl font-Marcellus bg-text_Color2 text-white"
                        onClick={() => addToCart()}
                      >
                        ADD TO CART {totalData} PCS
                      </button>
                    </div>
                    <button className="mobile:w-full sm:w-full p-1 border-2 rounded-3xl mt-2 bg-Cream font-Marcellus ">
                      Total Units In Cart: {totalQuantity} PCS
                    </button>
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
