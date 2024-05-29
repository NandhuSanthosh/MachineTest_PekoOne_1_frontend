import React from 'react'
import CarouselComponent from './components/Carousel'
import { PiParallelogramFill } from 'react-icons/pi'
import { IsAuthRouter } from '../components/Routing'

const layout = ({children}) => {
  return (
    <IsAuthRouter>
      <div className='flex h-lvh'>

          <div className='w-1/2 hidden lg:block'>
            <CarouselComponent />
          </div>

          <div className='flex-1 flex justify-center items-center relative'>

            {/* auth form */}
            {children}

            {/* app logo */}
            <div className='absolute top-7 left-10'>
              <div className='md:w-full flex justify-center items-center text-gray-900'>
                  <PiParallelogramFill size={"35"} className=''/>
                  <div>
                    <span className='text-bold text-xl'>dialog</span>
                  </div>
              </div>
            </div>

            {/* copy right */}
            <div className='absolute bottom-2'>
              <span className='text-gray-400 font-medium text-sm'>2024 ALL RIGHTS RESERVED</span>
            </div>


          </div>
      </div>
    </IsAuthRouter>
  )
}

export default layout
