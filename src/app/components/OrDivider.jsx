import React from 'react'

const OrDivider = () => {
  return (
    <div className='relative py-5 mt-4'>
        <div className='w-full border-b border-solid border-gray-300'>
        </div>
        <div className='absolute w-full h-full top-0 left-0 flex justify-center items-center'>
            <p className='bg-white w-6 text-base text-gray-500 inline-block text-center'>or</p>
        </div>
      </div>
  )
}

export default OrDivider
