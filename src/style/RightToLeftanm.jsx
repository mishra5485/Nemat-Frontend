import FlowerPattern2 from "../assets/loginImages/FlowerPattern2.png";
import "./style.css"

const RightToLeftanm = () => {
  return (
    <div className="flex shine">
      <img
        src={FlowerPattern2}
        alt="FlowerPatternImage2"
        className="w-full h-[46px] sm:inline-block md:hidden animate-slide-infinite"
      />
      <img
        src={FlowerPattern2}
        alt="FlowerPatternImage2"
        className="w-full h-[46px] sm:inline-block md:hidden animate-slide-infinite"
      />
      <img
        src={FlowerPattern2}
        alt="FlowerPatternImage2"
        className="w-full h-[46px] sm:inline-block md:hidden animate-slide-infinite"
      />
    </div>
  )
}

export default RightToLeftanm
