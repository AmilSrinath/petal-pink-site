
import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import ProductCard from "components/ProductCard";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  price: number;
  weight:number;
  image: string;
  image_url_2:string;
  image_url_3: string,
  description: string;
  keyPoints:string;
  category: string;
  tags: string[];
  link: string;
}

export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  const [products, setProducts] = useState<Product[]>([]); // Updated state type
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product/getAllData');
        const productData = response.data.map((item: any) => ({
          id: Number(item.product_id), // Convert id to number
          name: item.product_name,
          price: item.product_price,
          weight: item.weight,
          image: `data:image/png;base64,${item.image_url}`,
          image_url_2:`data:image/png;base64,${item.image_url_2}`,
          image_url_3:`data:image/png;base64,${item.image_url_3}`,
          description: item.description,
          keyPoints:item.keyPoints,
          category: "Category 1",
          tags: [],
          link: "/product-detail/",
        }));
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter the products based on the search term
  const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // @ts-ignore
  return (
      <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Search || Ciseco Ecommerce Template</title>
        </Helmet>

        <div
            className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
            data-nc-id="HeadBackgroundCommon"
        />

        {/* Search Container */}
        <div className="container">
          <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
            <form
                className="relative w-full"
                onSubmit={(e) => e.preventDefault()}
            >
              <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
              >
                <span className="sr-only">Search all icons</span>
                <Input
                    className="shadow-lg border-0 dark:border"
                    id="search-input"
                    type="search"
                    placeholder="Type your keywords"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    rounded="rounded-full"
                    value={searchTerm} // Controlled input
                    onChange={(e) => setSearchTerm(e.target.value)} // Handle input change
                />
                <ButtonCircle
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                >
                  <i className="las la-arrow-right text-xl"></i>
                </ButtonCircle>
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
              </span>
              </label>
            </form>
          </header>
        </div>

        <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          <main>
            {/* FILTER */}
            <HeaderFilterSearchPage />

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {filteredProducts.map((item, index) => (
                  <ProductCard data={item} key={index} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              {/*<Pagination />*/}
              {/*<ButtonPrimary loading>Show me more</ButtonPrimary>*/}
            </div>
          </main>

          {/* === SECTION 5 Choosen By our experts === */}
          {/* <hr className="border-slate-200 dark:border-slate-700" />
        <SectionSliderCollections />
        <hr className="border-slate-200 dark:border-slate-700" /> */}

          {/* SUBCRIBES EARN FREE MONEY WITH ciseco*/}
          {/* <SectionPromo1 /> */}
        </div>
      </div>
  );
};

export default PageSearch;