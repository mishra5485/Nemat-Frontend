import React from 'react'

const PolicyDetails = ({policie }) => {

   const htmlContent = policie.Data;

  return (
    <>
    <div className='text-text_Color' dangerouslySetInnerHTML={{ __html: htmlContent }} />
    <style>
    {`
      h6 {
        font-size: 20px; 
        margin-bottom: 5px;
        font-family: 'Marcellus', serif; 
        font-weight: bold; 
        margin-top: 15px;
      }
      p {
        font-size: 16px; 
        margin-bottom: 5px; 
        font-family: 'Marcellus', serif;
        font-weight:400;
        margin-top: 8px;
      }
    `}
  </style>
    </>
  )
}

export default PolicyDetails