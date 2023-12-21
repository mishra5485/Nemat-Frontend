import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import "./style.css"

const RightToLeftanm = ({image , }) => {
  return (
    <div className="flex shine px-1 gap-x-1">
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full h-[46px] sm:inline-block md:hidden animate-slide-infinite "
      />
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full h-[46px] sm:inline-block md:hidden animate-slide-infinite"
      />
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full h-[46px] sm:inline-block md:hidden animate-slide-infinite"
      />
    </div>
  )
}

export default RightToLeftanm
