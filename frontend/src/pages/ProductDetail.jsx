import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

function ProductDetail() {
  // Get productId from the URL
  const { productId } = useParams();

  // Get necessary data and functions from context
  const { products, currency, addtoCart, loading } = useContext(shopDataContext);

  // State to store current product data
  const [productData, setProductData] = useState(false);

  // State for image and size selection
  const [image, setImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [size, setSize] = useState('');

  // Load product data based on productId
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage1(item.image1);
        setImage2(item.image2);
        setImage3(item.image3);
        setImage4(item.image4);
        setImage(item.image1); // default image
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div>
      {/* Main container for product detail */}
      <div className='w-[99vw] h-[130vh] md:h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-center justify-start gap-5'>

        {/* Left side: Image gallery */}
        <div className='lg:w-[50vw] h-auto mt-[70px] flex flex-col lg:flex-row items-center gap-4'>
          {/* Thumbnail images */}
          <div className='flex lg:flex-col gap-3'>
            {[image1, image2, image3, image4].map((img, idx) => (
              <div key={idx} className='w-[50px] md:w-[100px] h-[50px] md:h-[110px] bg-slate-300 border rounded-md'>
                <img src={img} alt="" onClick={() => setImage(img)} className='w-full h-full cursor-pointer rounded-md' />
              </div>
            ))}
          </div>

          {/* Main selected image */}
          <div className='lg:w-[60%] border rounded-md overflow-hidden'>
            <img src={image} alt="" className='w-full h-full object-fill rounded-md' />
          </div>
        </div>

        {/* Right side: Product details */}
        <div className='lg:w-[50vw] px-6 py-4 flex flex-col gap-3'>
          <h1 className='text-[40px] font-semibold text-white'>{productData.name.toUpperCase()}</h1>

          {/* Static rating */}
          <div className='flex items-center gap-1 text-yellow-400'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
            <p className='text-white ml-2'>(124)</p>
          </div>

          {/* Price */}
          <p className='text-[30px] text-white font-semibold'>{currency} {productData.price}</p>

          {/* Description */}
          <p className='w-[80%] text-[18px] text-white'>
            {productData.description} and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style.
          </p>

          {/* Size selection */}
          <div className='flex flex-col gap-2 my-4'>
            <p className='text-[22px] text-white'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 bg-slate-300 rounded-md ${item === size ? 'bg-black text-blue-400 text-lg' : ''}`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button
              className='text-[16px] active:bg-slate-500 bg-[#495b61c9] py-2 px-6 rounded-xl text-white border shadow-md mt-2'
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          {/* Extra info */}
          <div className='w-full h-[1px] bg-slate-700'></div>
          <div className='text-white text-sm'>
            <p>✔️ 100% Original Product</p>
            <p>✔️ Cash on Delivery available</p>
            <p>✔️ Easy return/exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews tabs (static UI only) */}
      <div className='w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] px-5 py-10'>
        <div className='flex gap-4'>
          <p className='border px-5 py-3 text-sm text-white'>Description</p>
          <p className='border px-5 py-3 text-sm text-white'>Reviews (124)</p>
        </div>

        {/* Description box */}
        <div className='w-[80%] mt-4 bg-[#3336397c] text-white text-base px-4 py-6 rounded-md'>
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on SinghJii-store.
            Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.
            Easy to maintain and perfect for any setting, this shirt is a must-have essential.
          </p>
        </div>

        {/* Related products */}
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : <div className='opacity-0'></div>;
}

export default ProductDetail;
