import { useEffect, useState } from "react";
import rollons from "../../assets/HomePage/rollons.png"
import { FaAngleDown  } from "react-icons/fa6";
import ProductHeader from "../common/ProductHeader";


const Rollons = () => {


    const RollonsData = [
        {
            id:1,
            title:"Deluxe Series(3ml)",
            image:rollons
        },
        {
            id:2,
            title:"Deluxe Series(8ml)",
            image:rollons
        },
        {
            id:3,
            title:"Deluxe Series Bulk",
            image:rollons
        },
        {
            id:4,
            title:"Fancy Series(3ml)",
            image:rollons
        },
        {
            id:5,
            title:"Fancy Series Bulk",
            image:rollons
        },
        {
            id:6,
            title:"Abyaz Series",
            image:rollons
        },
        {
            id:7,
            title:"Uber Luxe Series",
            image:rollons
        },
        {
            id:8,
            title:"Janata Series",
            image:rollons
        },
        {
            id:9,
            title:"Cooler Series",
            image:rollons
        },
        {
            id:10,
            title:"Fancy Series (8ml)",
            image:rollons
        },
    ]

    const [showMore, setShowMore] = useState(false);
        const [itemsToDisplay, setItemsToDisplay] = useState(getItemsToDisplay());
    
        function getItemsToDisplay() {
        const screenSize = window.innerWidth;
        if (showMore) {
            return RollonsData;
        } else if (screenSize >= 1024) {
            // lg: 10 items
            return RollonsData.slice(0, 10);
        } else if (screenSize >= 768) {
            // md: 8 items
            return RollonsData.slice(0, 8);
        } else {
            // sm: 4 items
            return RollonsData.slice(0, 6);
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
            setItemsToDisplay(RollonsData);
        };


  return (
    <div className="mt-8">

        <ProductHeader title={"ROLL ONS"}/>

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

export default Rollons
