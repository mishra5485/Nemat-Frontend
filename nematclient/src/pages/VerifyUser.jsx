import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import verifyImage from "../../../assets/verified.gif"


const VerifyUser = () => {

   const { _id } = useParams()
   const [displayData , setDisplayData ] = useState(false)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

   useEffect(() => {
      verifyUser();
   }, [])

   const verifyUser = async() => {
            
      try {
      let response = await axios.get(
         `${import.meta.env.VITE_REACT_APP_BASE_URL}/user/verifyemail/${_id}`
      )



         if(response.status === 200){
         toast.success("You are verify")
         setDisplayData(true)
         setLoading(false)
         handlerWait()
      }

      } catch (error) {
         toast.error("You need to verify")
         setLoading(false)
      }
   }

   const handlerWait =  () => {
      setTimeout(() => {
         navigate("/")
      },2000)
   }

   return (
      <div>
         <Toaster/>
         {loading ? (
            <p>Loading...</p>
         ) : (
            displayData ? (

               <div className='w-full h-full flex flex-col justify-center items-center'>
                  <div className='w-full h-full flex justify-center items-center'>
                     {/* <img src={verifyImage} alt="" className='w-[50%] h-[50%] mt-[2%] ' /> */}
                     <h1>You Are know Verify User </h1>
                  </div>
                 
               </div>
            
            ) : (
               <h1>Please Verify Yourself </h1>
            )
         )}
         </div>
  )
}

export default VerifyUser