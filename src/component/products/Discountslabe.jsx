import ProductHeader from "../common/ProductHeader"


const Discountslabe = () => {


  const slabs = [
    {
      id:1 ,
      OrderValue:"From Rs. 500 to Rs. 50,000",
      On_Agarbattis:"9.50%",
      On_Fragrences:"24%"
    },
    {
      id:2 ,
      OrderValue:"From Rs. 50,000 to Rs. 99,999",
      On_Agarbattis:"18%",
      On_Fragrences:"24%",
    },
    {
      id:3,
      OrderValue:"From Rs. 1,00,000 to Rs. 2,99,999",
      On_Agarbattis:"18%",
      On_Fragrences:"25%"
    },
    {
      id:4,
      OrderValue:"From Rs. 3,00,000 And 4,99,999 ",
       On_Agarbattis:"18%",
      On_Fragrences:"26%"
    },
    {
      id:5,
      OrderValue:"From Rs. 5,00,000 And Above ",
       On_Agarbattis:"18%",
      On_Fragrences:"27%"
    },   
  ]

  return (
    <div className="flex w-[100%]  flex-col justify-center items-center  mt-8 bg-Cream">
        <div className="mt-10">
        <ProductHeader title={"DISCOUNT SLABS"} className="pt-4"/>
        </div>
    
        <div  className="mt-9 mb-9 md:w-[80%] sm:w-[70%] mobile:w-[96%]">
            <div className="flex flex-col w-[100%]   border-2 border-text_Color font-Marcellus text-text_Color overflow-hidden">
                <div className="flex border-b-2 border-text_Color w-full h-[68px] justify-around items-center text-center mobile:text-xs sm:text-base md:text-xl">
                  <h1 className="text-center w-[34%] overflow-hidden">ORDER VALUE <span className="p-2  text-white bg-[#642F29]  bg-#642F29 rounded-iFull">i</span></h1>
                  <h1 className="pl-3 w-[33%] border-text_Color border-l-2 border-r-2">ON AGARBATTIS </h1>
                  <h1 className="pl-3 w-[33%] border-text_Color ">OR FRAGRANCES</h1>
                </div>

                <div className="w-full pt-1 font-Marcellus text-text_Color">
                  {
                    slabs.map((item) => (
                      <div key={item.id} className="w-full mobile:h-[128px] sm:h-[80px] md:h-[68px] flex justify-between items-center text-center border-t-2 border-text_Color border-b-1">
                        <p className="w-[34%] pr-4  ">{item.OrderValue}</p>
                        <p className="w-[33%] border-text_Color border-l-2 border-r-2">{item.On_Agarbattis}</p>
                        <p className="w-[33%] border-text_Color "> {item.On_Fragrences}</p>
                      </div>

                    ))
                  }
                </div>                
            </div>
            <div>

            </div>
        </div>

    </div>
  )
}

export default Discountslabe
