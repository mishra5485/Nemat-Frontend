import React, { useEffect, useState } from 'react'

const ProgressBar = ({qunantityData , totalvalue}) => {

   const [maxValue , setMaxValue ] = useState();


   console.log("qunantityData " , qunantityData)
   console.log("totalvalue  " , totalvalue )

   useEffect(() => {
    findMaxValue();
  }, [qunantityData]);


   const findMaxValue = () => {
      const maxMinValue = Math.max(...qunantityData.SchemeValues.map(item => item.min));
      setMaxValue(maxMinValue)
   }

   console.log("maxValue ====> " ,  maxValue)

   const calculatePercentage = () => {
    if (maxValue === 0 || totalvalue === 0) {
      return 0;
    }
    return (totalvalue / maxValue) * 100;
  };

  return (
    <div>
      <div style={{ width: '100%', backgroundColor: '#eee', height: '20px' }}>
        <div
          style={{
            width: `${calculatePercentage()}%`,
            backgroundColor: 'green',
            height: '100%',
          }}
        >
          {totalvalue}
        </div>
      </div>
    </div>
  )
}

export default ProgressBar