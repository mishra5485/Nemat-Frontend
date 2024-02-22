import React from 'react'

const PolicyDetails = ({policie }) => {


   console.log("policie ===> " , policie )
   const htmlContent = policie.Data;

  return (
    <div className='text-text_Color' dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}

export default PolicyDetails