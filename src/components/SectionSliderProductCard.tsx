import React, {FC, useEffect, useId, useRef, useState} from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import ProductCard from "./ProductCard";
import axios from "axios";
// import { Product, PRODUCTS } from "data/data";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

export interface Product {
  product_id: number;
  product_name: string;
  product_price: number;
  discount: number;
  weight: number;
  amount:number;
  unit_type:string;
  image_url: string;
  image_url_2: string;
  image_url_3: string;
  description: string;
  keyPoints: string;
  category: string;
  faq: string;
  howToUse: string;
  tags: string[];
  link: string;
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "Petal pink",
  // data = PRODUCTS.filter((_, i) => i < 8 && i > 2),
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  const [products, setProducts] = useState<Product[]>([]); // Updated state type

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://65.2.181.144:4000/api/customerOrderSave/getAllData");
        const productData = response.data.map((item: any) => ({
          product_id: Number(item.product_id), // Ensure ID is a number
          product_name: item.product_name,
          product_price: item.product_price,
          discount: item.discount,
          weight: item.weight,
          amount: item.amount,
          unit_type: item.unit_type || "",
          image_url: item.image_url,
          image_url_2: item.image_url_2,
          image_url_3: item.image_url_3,
          description: item.description,
          keyPoints: item.keyPoints,
          category: item.category || "Uncategorized", // Add a fallback
          faq: item.faq || "",
          howToUse: item.howToUse || "",
          tags: item.tags || [],
          link: `/product-detail/${item.product_id}`, // Create dynamic link
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty array for only running once


  useEffect(() => {
    if (!sliderRef.current) {
      return () => {};
    }

    // Initialize Glide.js
    const OPTIONS: {
      perView: number;
      gap: number;
      bound: boolean;
      breakpoints: {
        640: { perView: number; gap: number };
        500: { perView: number; gap: number };
        1024: { perView: number; gap: number };
        768: { perView: number; gap: number };
        1280: { perView: number }
      }
    } = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: { perView: 4 - 1 },
        1024: { gap: 20, perView: 4 - 1 },
        768: { gap: 20, perView: 4 - 2 },
        640: { gap: 20, perView: 1.5 },
        500: { gap: 20, perView: 1.3 },
      },
    };

    const slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();

    return () => {
      slider.destroy(); // Cleanup Glide instance
    };
  }, [UNIQUE_CLASS,products]); // Add dependencies if necessary


  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {products.map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                 <ProductCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
