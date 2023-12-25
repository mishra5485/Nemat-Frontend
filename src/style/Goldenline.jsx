import "./style.css"


const Goldenline = ({image}) => {
  return (
    <div>
      <div className="flex shine px-1 gap-x-4">
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full sm:h-[46px] md:h-[50px] sm:inline-block  animate-slide-infinite "
      />
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full sm:h-[46px] md:h-[50px] sm:inline-block animate-slide-infinite"
      />
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full sm:h-[46px] md:h-[50px] sm:inline-block animate-slide-infinite"
      />
      <img
        src={image}
        alt="FlowerPatternImage2"
        className="w-full sm:h-[46px] md:h-[50px] sm:inline-block animate-slide-infinite"
      />
    </div>
    </div>
  )
}

export default Goldenline
