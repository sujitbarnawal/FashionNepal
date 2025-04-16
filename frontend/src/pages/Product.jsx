/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShopStore from "../store/shopStore";
import { assets } from "../assets/assets";
import RelatesProducts from "../components/RelatesProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useShopStore();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === productId);
    setImage(product.image[0]);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* Product images */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%] ">
            {productData.image.map((img, index) => {
              return (
                <img
                  onClick={() => setImage(img)}
                  key={index}
                  src={img}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer "
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_icon} alt="" />
            <img className="w-3.5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(97)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((sizeVal, index) => {
                return (
                  <button
                    onClick={() => setSize(sizeVal)}
                    key={index}
                    className={` py-2 px-4 bg-gray-100 cursor-pointer ${
                      sizeVal === size ? "border-orange-500 border" : ""
                    }`}
                  >
                    {sizeVal}
                  </button>
                );
              })}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer">
            Add to Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return & exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Review section */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border border-gray-200 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-200 px-5 py-3 text-sm">
            Reviews {97}
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-200 px-6 py-6 text-sm text-gray-500">
          <p>
            Experience the finest quality with our carefully curated products.
            Each item is crafted with premium materials, ensuring durability and
            elegance. We prioritize excellence in design, functionality, and
            comfort. Our products go through rigorous quality checks to meet the
            highest standards. Trusted by thousands, we are committed to
            delivering the best shopping experience. Shop with confidence,
            knowing you’re getting unmatched quality at the best value. Elevate
            your lifestyle with products designed to last!
          </p>
          <p>
            We offer a wide range of sizes to ensure the perfect fit for
            everyone. Our size chart is designed to guide you in choosing the
            right fit for your body type. Whether you are looking for petite,
            regular, or plus sizes, we’ve got you covered. Each product is
            available in multiple sizes to provide comfort and style for all. If
            you are unsure, our detailed sizing guide will help you make an
            informed decision. Embrace your unique shape with clothing that fits
            just right!
          </p>
        </div>
      </div>
      {/* Related products */}
      <RelatesProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
