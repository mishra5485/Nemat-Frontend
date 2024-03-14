import React from 'react'
import { useSelector } from 'react-redux';


function RightToLeftText() {

  const { user } = useSelector((store) => store.profile);
  const Company_Name = user?.customer_CompanyName
  return (
    <div className='shineText text-white bg-bg_green mt-0 flex justify-evenly p-1 '>
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p> 
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p> 
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p> 
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p> 
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p> 
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p> 
      <p className='animate-slide-infiniteText px-20' >Welcome {Company_Name}    </p>

   </div>
  )
}

export default RightToLeftText