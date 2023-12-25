import Agarabttiimg from "../../assets/HomePage/Agarabtti-Majmua.png"
import ProductHeader from "../common/ProductHeader"

const Agarabtti = () => {
  return (
    <div className="mt-8">

         <ProductHeader title={"AGARBATTIS"}/>
         
         <div className="w-[100%] flex justify-center items-center">
   
          <div  className="flex w-full flex-col justify-center gap-y-3 items-center mb-2  ">
            <img src={Agarabttiimg} className="mobile:p-2 sm:p-5 md:p-5 flex justify-center items-center"  />
            <h1 className="font-roxborough text-xl text-center w-full text-text_Color mb-4">Premium Masala Agarbatti</h1>
            <button className="w-[137px] h-[43px] bg-bg_green rounded-3xl font-Marcellus text-white mb-7">SHOP NOW</button>
          </div>
      </div>

    </div>
  )
}

export default Agarabtti