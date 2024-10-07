import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import AccordionInfo from "./AccordionInfo";
import BagIcon from "components/BagIcon";
import { NoSymbolIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";
import IconDiscount from "components/IconDiscount";
import Prices from "components/Prices";
import toast from "react-hot-toast";
import Policy from "./Policy";
import NotifyAddTocart from "components/NotifyAddTocart";
import { useLocation } from "react-router-dom";

export interface ProductDetailPageProps {
  className?: string;
}

const getImageSrc = (avatar: string | { data: number[] } | undefined): string => {
  if (!avatar) {
    return '';
  }

  if (typeof avatar === 'string') {
    if (avatar.startsWith('/9j/')) {
      return `data:image/jpeg;base64,${avatar}`;
    }
    if (avatar.startsWith('UklGR')) {
      return `data:image/jpeg;base64,${avatar}`;
    }
    if (avatar.startsWith('iVBORw0K')) {
      return `data:image/png;base64,${avatar}`;
    }
    if (avatar.startsWith('R0lGOD')) {
      return `data:image/gif;base64,${avatar}`; 
    }
    if (avatar.startsWith('UklGR')) {
      return `data:image/webp;base64,${avatar}`;
    }

    
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
    const isImageURL = imageExtensions.some(ext => avatar.toLowerCase().endsWith(ext));
    if (isImageURL) {
      return avatar;
    }
  }

  return avatar as string;
};


const ProductDetailPage: FC<ProductDetailPageProps> = ({ className = "" }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [detail1Src, setDetail1Src] = useState("");
  const [detail2Src, setDetail2Src] = useState("");
  const [detail3Src, setDetail3Src] = useState("");
  const [variantActive, setVariantActive] = useState(0);
  const [sizeSelected, setSizeSelected] = useState("");
  const [qualitySelected, setQualitySelected] = useState(1);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem('hasReloaded');
    
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }, []);
  useEffect(() => {
    const storedProductData = localStorage.getItem("productData");

    if (storedProductData) {
      const productData = JSON.parse(storedProductData);

      setProductName(productData.product_name);
      setProductPrice(productData.product_price);
      setDetail1Src(getImageSrc(productData.image_url));
      setDetail2Src(getImageSrc(productData.image_url_2));
      setDetail3Src(getImageSrc(productData.image_url_3));
    } else {
      console.log("No product data found in localStorage.");
    }
  }, [location]);

  const LIST_IMAGES_DEMO = [detail1Src, detail2Src, detail3Src];

  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={LIST_IMAGES_DEMO[0]}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">{productName}</h2>
          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={productPrice}
            />
          </div>
        </div>
        <div className="flex space-x-3.5">
          <ButtonPrimary className="flex-1 flex-shrink-0" onClick={notifyAddTocart}>
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add to cart</span>
          </ButtonPrimary>
        </div>
        <hr className="2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        <AccordionInfo />
        <div className="hidden xl:block">
          <Policy />
        </div>
      </div>
    );
  };

  const renderStatus = () => {
    if (!status) return null;
    const CLASSES = "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
    if (status === "New in") {
      return (
        <div className={CLASSES}>
          <SparklesIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "50% Discount") {
      return (
        <div className={CLASSES}>
          <IconDiscount className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "Sold Out") {
      return (
        <div className={CLASSES}>
          <NoSymbolIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    if (status === "limited edition") {
      return (
        <div className={CLASSES}>
          <ClockIcon className="w-3.5 h-3.5" />
          <span className="ml-1 leading-none">{status}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`nc-ProductDetailPage ${className}`}>
      <main className="container mt-5 lg:mt-11">
        <div className="lg:flex">
          <div className="w-full lg:w-[55%]">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-16">
                <img src={LIST_IMAGES_DEMO[0]} className="w-full rounded-2xl object-cover" alt="product detail 1" />
              </div>
              {renderStatus()}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
              {LIST_IMAGES_DEMO.slice(1).map((item, index) => (
                <div key={index} className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16">
                  <img src={item} className="w-full rounded-2xl object-cover" alt={`product detail ${index + 2}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
