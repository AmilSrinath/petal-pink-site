import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HeaderFilterSearchPage from "components/HeaderFilterSearchPage";
import Input from "shared/Input/Input";
import ButtonCircle from "shared/Button/ButtonCircle";
import ProductCard from "components/ProductCard";
import axios from "axios";
import { FaThLarge, FaTh, FaThList } from "react-icons/fa";
import ButtonPrimary from "../shared/Button/ButtonPrimary"; // Import icons

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

export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  const [products, setProducts] = useState<Product[]>([]); // Updated state type
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [columns, setColumns] = useState(4); // State to control number of columns

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://petalpink.lk/api/customerOrderSave/getAllData");
        const productData = response.data.map((item: any) => ({
          product_id: Number(item.product_id), // Convert id to number
          product_name: item.product_name,
          product_price: item.product_price,
          discount: item.discount,
          weight: item.weight,
          amount:item.amount,
          image_url: item.image_url,
          image_url_2: item.image_url_2,
          image_url_3: item.image_url_3,
          description: item.description,
          keyPoints: item.keyPoints,
          category: "Category 1",
          tags: [],
          link: "/product-detail/",
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter the products based on the search term
  const filteredProducts = products.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>Search || Ciseco Ecommerce Template</title>
        </Helmet>

        <div
            className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20`}
            data-nc-id="HeadBackgroundCommon"
        />

        {/* Search Container */}
        <div className="container">
          <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
            <form className="relative w-full" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search-input" className="text-neutral-500 dark:text-neutral-300">
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
                  <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

            {/* Grid Layout Toggle Buttons - hidden on mobile */}
            <div className="flex justify-center mb-8 space-x-4 hidden sm:block">
              <ButtonPrimary onClick={() => setColumns(3)} className="px-4 py-2 bg-blue-500 text-white rounded-3xl">
                <FaThLarge size={15} /> {/* Icon for 3 columns */}
              </ButtonPrimary>
              <ButtonPrimary onClick={() => setColumns(4)} className="px-4 py-2 bg-blue-500 text-white rounded-3xl">
                <FaTh size={15} /> {/* Icon for 4 columns */}
              </ButtonPrimary>
              <ButtonPrimary onClick={() => setColumns(5)} className="px-4 py-2 bg-blue-500 text-white rounded-3xl">
                <FaThList size={15} /> {/* Icon for 5 columns */}
              </ButtonPrimary>
            </div>

            {/* LOOP ITEMS */}
            <div
                className={`grid ${
                    columns === 3
                        ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                        : columns === 4
                            ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
                } gap-x-4 gap-y-6 mt-8 lg:mt-10`}
            >
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
        </div>
      </div>
  );
};

export default PageSearch;
