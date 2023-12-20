import FlowerPattern from "../assets/loginImages/FlowerPattern.png"
import "./style.css"

function InfiniteScrollImage() {

   
  return (
       <div className="overflow-hidden">
      <div className="animate-scrolling">
        <img
          src={FlowerPattern}
          alt="FlowerPatternImage"
          className="w-full animate-img"
        />
        <img
          src={FlowerPattern}
          alt="FlowerPatternImage"
          className="w-full animate-img"
        />
         <img
          src={FlowerPattern}
          alt="FlowerPatternImage"
          className="w-full animate-img"
        />
      </div>
    </div>
  );
}

export default InfiniteScrollImage;