import React from 'react'

const PolicyDetails = ({policie }) => {


   console.log("policie ===> " , policie )
   const htmlContent = policie.Data;

  return (
    <>
    <div className='text-text_Color' dangerouslySetInnerHTML={{ __html: htmlContent }} />
    <style>
    {`
      h6 {
        font-size: 22px; 
        margin-bottom: 5px;
        font-family: 'Marcellus', serif; 
        font-weight: bold; 
      }
      p {
        font-size: 16px; 
        margin-bottom: 5px; 
        margin-top: 8px;
      }
    `}
  </style>
    </>
  )
}

export default PolicyDetails