import React from 'react'

const Btn_Text = ({ width, height, text, typeBtn ,  onClick }) => {
  return (
      <button
      type={typeBtn} // or "submit" if it's a submit button
      className={`inline-flex w-[${width}] h-[${height}] mt-9 items-center justify-center rounded-3xl bg-[#60713A] leading-7 text-white font-marcellus text-base leading-17 tracking-normal text-center hover:animate-pulse hover:bg-`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Btn_Text