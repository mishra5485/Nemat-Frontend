import React from 'react'

const RequestSent = () => {

    const MenuPageHandler = () => {
         // console.log("New Page")
  }


  return (

      <div className='w-full h-[300px] relative'>
            <div className='relative'>
                           {/* Header section in 3rd div */}

                </div>

                <div className='flex text-xs gap-2'>
                    <h1 className='text-green-600 gap-x-1 cursor-pointer' ><span className='p-1 text-center border rounded-full ml-1 gap-x-2 bg-green-900'>1 </span> Company Details  {"->"}</h1>
                    <h1  className="text-green-600 cursor-pointer"><span className= "p-1 text-center border rounded-full ml-1 gap-x-2 bg-green-900">2 </span> Company Details {"->"}</h1>
                    <h1 className="text-green-600 cursor-pointer" ><span className='p-1 text-center border rounded-full ml-1 gap-x-2 bg-green-900'>3</span> Company Details </h1>
                  </div>  
                    <div className='relative flex flex-col justify-center items-center'>
                           <span className='p-3 border  rounded-full  bg-green-400'>✔</span>
                           <h1>Request Sent Successfully</h1>

                           <p className='text-center'>
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quaerat commodi accusamus! Eligendi ea possimus repellendus blanditiis quam. Repudiandae, fuga.
                           </p>

                           <button className=' bg-green-600 p-3 rounded-2xl' onClick={MenuPageHandler}>
                              <a className='text-2xl' href="/"> NEXT</a>
                           </button>

                        </div>
        </div>

  )
}

export default RequestSent