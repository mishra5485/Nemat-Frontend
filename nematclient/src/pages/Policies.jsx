import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import NavBars from "../component/common/NavBars";
import DottedLineGold from "../assets/HomePage/DottedLineGold.png";
import PolicyDetails from "../component/common/PolicyDetails";
import getToken from "../component/auth/GetToken";
import Footer from "../component/footer/footer";
import Flower from "../assets/HomePage/Flower.png";

const Policies = () => {
  const [policiesData, setPoliciesData] = useState([]);
  const [selectedPolicie, setSelectedPolicie] = useState(null);

  useEffect(() => {
    getAllPoliciesData();
  }, []);

  const getAllPoliciesData = async () => {
    try {
      const header = getToken();

      let response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/policies/getall`,
        header
      );

      console.log(response.data);
      setPoliciesData(response.data);
      setSelectedPolicie(response.data[0]);
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;

      if (
        status === 404 ||
        status === 403 ||
        status === 500 ||
        status === 302 ||
        status === 409 ||
        status === 401 ||
        status === 400
      ) {
        console.log(data);
        toast.error(data);
      }
    }
  };

  const handleClick = (policie) => {
    setSelectedPolicie(policie);
  };

  return (
    <div>
      <Toaster />
      <div className="bg-Cream">
        <NavBars />
      </div>
      <div className="w-full h-auto">
        <div className="w-full uppercase h-[10.75rem] bg-LightCream text-text_Color font-roxborough font-bold text-xl flex justify-center items-center">
          <h1 className="ml-[2%]">our policies</h1>
        </div>

        <div className="p-2 py-3  w-full mb-2">
          <img src={Flower} className="w-full" />
        </div>


        {/* HEADIND SECTION */}
        <div className="w-full mobile:h-[50%]">
  <div className="md:w-[90%] mobile:w-[90%] mx-auto flex mt-8 md:items-center md:justify-center gap-x-8 uppercase text-text_Color font-roxborough font-semibold overflow-x-auto ">
    {policiesData.map((policy) => (
      <div key={policy._id} className="flex-shrink-0">
        <h2
          className={`cursor-pointer whitespace-nowrap overflow-hidden md:text-2xl mobile:text-lg sm:text-lg ${
            selectedPolicie === policy ? "underline" : "opacity-50"
          }`}
          onClick={() => handleClick(policy)}
        >
          {policy.Name}
        </h2>
      </div>
    ))}
  </div>
</div>




        <div className="w-[90%] mx-auto mt-11">
          {selectedPolicie && <PolicyDetails policie={selectedPolicie} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Policies;
