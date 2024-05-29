import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
const contentStyle = {
  height: '100vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const stockImages = [{
  path: "/auth_page_stock_1.jpg"
}, {
  path: "/auth_page_stock_2.jpg"
}, {
  path: "/auth_page_stock_3.jpg"
}, {
  path: "/auth_page_stock_4.jpg"
}]


const App = () => (
  <Carousel arrows autoplay autoplaySpeed={3000}>
    {
      stockImages.map( (image) => {
        return (
          <div className='h-lvh'>
            <img src={image.path} alt="" />
          </div>
        )
      })
    }
  </Carousel>
);
export default App;