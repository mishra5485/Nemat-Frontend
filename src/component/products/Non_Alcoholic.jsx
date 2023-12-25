import { useEffect, useState } from "react";
import NonAlcoholicSpraysImg from "../../assets/HomePage/rollons.png"
import { FaAngleDown  } from "react-icons/fa6";
import ProductHeader from "../common/ProductHeader";

const Non_Alcoholic = () => {


    const RollonsData = [
        {
            id:1,
            title:"Deluxe Series(3ml)",
            image:NonAlcoholicSpraysImg
        },
        {
            id:2,
            title:"Deluxe Series(8ml)",
            image:NonAlcoholicSpraysImg
        },
        {
            id:3,
            title:"Deluxe Series Bulk",
            image:NonAlcoholicSpraysImg
        },
        
    ]

  return (
    <div className="mt-10">

      <ProductHeader title={"NON-ALCOHOLIC SPRAYS"}/>

        <div className="w-full flex justify-center items-center mt-8">
      <div className="w-[90%] md:w-[70%] lg:w-[50%]  sm:grid-cols-3 sm:grid mobile:grid mobile:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {RollonsData.map((item) => (
          <div key={item.id} className="flex w-full flex-col gap-y-3 items-center mb-2  ">
            
                <img src={item.image} className="md:h-[320px] mobile:p-2 sm:p-5 md:p-5 flex justify-center items-center" alt={item.title} />
            <h1 className="font-roxborough text-xl text-center w-full text-text_Color mb-4">{item.title}</h1>
            <button className="w-[137px] h-[43px] bg-bg_green rounded-3xl font-Marcellus text-white mb-7">SHOP NOW</button>
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Non_Alcoholic
