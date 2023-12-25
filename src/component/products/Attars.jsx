import { useEffect, useState } from "react";
import attars from "../../assets/HomePage/attars.png"
import { FaAngleDown  } from "react-icons/fa6";
import ProductHeader from "../common/ProductHeader";

const Attars = () => {


        const AttarsData = [
            {
                id:1,
                title:"96 Medium Series",
                image:attars
            },
            {
                id:2,
                title:"96 London Series",
                image:attars
            },
            {
                id:3,
                title:"96 Series(3ml)",
                image:attars
            },
            {
                id:4,
                title:"96 Series(5ml)",
                image:attars
            },
            {
                id:5,
                title:"96 Series(10ml)",
                image:attars
            },
            {
                id:6,
                title:"96 Taj Series",
                image:attars
            },
            {
                id:7,
                title:"96 Diamond Cut Series",
                image:attars
            },
            {
                id:8,
                title:"96 Series Bulk",
                image:attars
            },
            {
                id:9,
                title:"726 Series(10ml)",
                image:attars
            },
            {
                id:10,
                title:"726 Series(25ml)",
                image:attars
            },
            {
                id:11,
                title:"Shaahi Series(10ml)",
                image:attars
            },
            {
                id:12,
                title:"Shaahi Series(25ml)",
                image:attars
            },
            {
                id:13,
                title:"Nazneen Series",
                image:attars
            },
            {
                id:14,
                title:"Superior Series",
                image:attars
            },

        ]

        const [showMore, setShowMore] = useState(false);
        const [itemsToDisplay, setItemsToDisplay] = useState(getItemsToDisplay());
    
        function getItemsToDisplay() {
        const screenSize = window.innerWidth;
        if (showMore) {
            return AttarsData;
        } else if (screenSize >= 1024) {
            // lg: 10 items
            return AttarsData.slice(0, 10);
        } else if (screenSize >= 768) {
            // md: 8 items
            return AttarsData.slice(0, 8);
        } else {
            // sm: 4 items
            return AttarsData.slice(0, 6);
        }
        }
    
        useEffect(() => {
        function handleResize() {
            setItemsToDisplay(getItemsToDisplay());
        }
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        }, [showMore]);

        const handleViewMore = () => {
            setShowMore(true);
            setItemsToDisplay(AttarsData);
        };

  return (
    <div className="mt-10">

        <ProductHeader title={"ATTARS"}/>


        <div className="w-full flex justify-center items-center mt-8">
      <div className="w-[90%] sm:grid-cols-3 sm:grid mobile:grid mobile:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {itemsToDisplay.map((item) => (
          <div key={item.id} className="flex w-full flex-col gap-y-3 items-center mb-2  ">
            <img src={item.image} className="mobile:p-2 sm:p-5 md:p-5 flex justify-center items-center" alt={item.title} />
            <h1 className="font-roxborough text-xl text-center w-full text-text_Color mb-4">{item.title}</h1>
            <button className="w-[137px] h-[43px] bg-bg_green rounded-3xl font-Marcellus text-white mb-7">SHOP NOW</button>
          </div>
        ))}
      </div>
    </div>
    {!showMore && (
        <div className="flex justify-center mt-4">
          <button onClick={handleViewMore} className="font-Marcellus text-xl text-bg_green flex items-end ">VIEW ALL <span><FaAngleDown className="animate-bounce"/></span></button>
        </div>
      )}
    </div>
  )
}

export default Attars
