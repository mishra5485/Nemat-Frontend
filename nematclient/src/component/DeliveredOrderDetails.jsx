import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const DeliveredOrderDetails = () => {

   const {_id} = useParams()
   const [loading, setLoading] = useState(true);
   const [nodata, setNoData] = useState(false);

   useEffect(() => {
      getAllDeliveredOrderDetails();
   },[])

   const getAllDeliveredOrderDetails = async () => {

      const payload = {
         user_id : _id
      }

      try {
         
         let response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BASE_URL}/order/getdeliveredorders`,
            payload
         )

         console.log(response.data)
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
        <p>Loaddding....</p>
      ) : (
        <>
          {nodata ? (
            <p>No Delivered Orders Found</p>
          ) : ( 
            <div></div> )
          }
         </> 
      )}
    </div>
  )
}

export default DeliveredOrderDetails