import React, { useEffect, useState } from 'react'

const ProgressBar = ({qunantityData , totalvalue}) => {

   const [maxValue , setMaxValue ] = useState();


  //  console.log("qunantityData " , qunantityData)
  //  console.log("totalvalue  " , totalvalue )

   useEffect(() => {
    findMaxValue();
  }, [qunantityData , totalvalue]);


   const findMaxValue = () => {
      const maxMinValue = Math.max(...qunantityData.SchemeValues.map(item => item.min));
      setMaxValue(maxMinValue)
   }

  //  console.log("maxValue ====> " ,  maxValue)

  //  const calculatePercentage = () => {
  //   if (maxValue === 0 || totalvalue === 0) {
  //     return 0;
  //   }
  //   return (totalvalue / maxValue) * 100;
  // };

  const calculateWidth = (min, max) => {
  if (totalvalue >= min && totalvalue <= max) {
    return `${(totalvalue / max) * 100}%`;
  } else if (totalvalue >= min && totalvalue >= max) {
    return '100%';
  } else if (totalvalue >= min && max === undefined || null ) {
    return '100%';
  }else{
    return '0%'
  }
};

  return (
    <div>
    <div className='w-[90%] mx-auto flex relative'>
  {
    qunantityData.SchemeValues.map((data) => (
      <div key={data._id} className='w-full relative font-roxborough font-semibold text-lg' >
        <h1>{data.min}</h1>
        <h1 className=''>PCS</h1>
        <h1 className='border-r-2 h-4 border-l-2 border-text_Color relative z-10'></h1>
      </div>
    ))
  }
</div>
    {/* <div className='w-full h-[50px] '>
      <div className='w-[90%] h-[50px] bg-[#8FA75B] mx-auto relative'>
        <div
          style={{
            width: `${calculatePercentage()}%`,
            backgroundColor: '#425711',
            height: '100%',
          }}
          > 
          <div className='flex w-full h-full justify-evenly items-center absolute'>

            {
              qunantityData.SchemeValues.map((data) => (
                <div key={data._id} className='w-full flex h-full font-Marcellus '>
                  <h1 className='w-full border-text_Color border-r-2 border-l-2 h-full flex justify-center items-center text-center text-white '>Rs.{data.value} / PC</h1>
                </div>
              ))
            }
            </div>
          {totalvalue}
        </div>
      </div>
    </div> */}

    <div className=' h-auto flex w-[90%] mx-auto '>
  {qunantityData.SchemeValues.map((data) => (
    <div key={data._id} className='w-[90%] h-[50px] bg-[#8FA75B] mx-auto relative mb-2'>
      <div
        style={{
          width: calculateWidth(data.min, data.max),
          backgroundColor: '#425711',
          height: '100%',
        }}
      >
        <div className='flex w-full h-full justify-evenly items-center absolute'>
          <div className='w-full flex h-full font-Marcellus '>
            <h1 className='w-full border-text_Color border-r-2 border-l-2 h-full flex justify-center items-center text-center text-white '>
              Rs.{data.value} / PC
            </h1>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>;
    <div className='flex mt-3'>
  {
    qunantityData.SchemeValues.map((data, index, array) => {
      const isLastItem = index === array.length - 1;
      const isInRange = isLastItem ? (totalvalue >= data.min && totalvalue) : (totalvalue >= data.min && totalvalue <= data.max);

      return isInRange ? (
        <div key={data._id} className='w-full flex h-full font-Marcellus '>
          <h1 className='w-full flex justify-center items-center text-center'>Rs.{data.value} / PC</h1>
        </div>
      ) : null;
    }).filter(Boolean)[0]
  }
</div>
    </div>
  )
}

export default ProgressBar