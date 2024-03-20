import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import OrderDetailsData from './common/orderDetailsData';
import getToken from './auth/GetToken';

const DeliveredOrderDetails = () => {

   const {_id} = useParams()
   const [loading, setLoading] = useState(true);
   const [nodata, setNoData] = useState(false);
   const [data , setData] = useState([])

   useEffect(() => {
      getAllDeliveredOrderDetails();
   },[])

   const getAllDeliveredOrderDetails = async () => {

      const payload = {
         user_id : _id
      }

      try {
          
        const header = getToken();

         let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/getdeliveredorders`,
            payload , 
            header
         )

         console.log(response.data)
         setData(response.data)
         setLoading(false)
      } catch (error) {
          const { status, data } = error.response;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
            if (status === 403) {
            setNoData(true);
          }
          console.log(data);
          setLoading(false);
        }
      }
   }

  return (
    <div>
       {loading ? (
        <p></p>
      ) : (
        <>
          {nodata ? (
            <p className='mt-4 w-[100%] text-center mx-auto text-xl font-Marcellus font-bold'>No Delivered Orders Found</p>
          ) : ( 
            <div>
              <OrderDetailsData data={data} _id={_id}/>
            </div> )
          }
         </> 
      )}
    </div>
  )
}

export default DeliveredOrderDetails