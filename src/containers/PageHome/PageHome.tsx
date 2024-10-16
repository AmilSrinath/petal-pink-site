import React, {useEffect, useState} from "react";
import SectionHero2 from "components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import {Product} from "../PageSearch";
import {fetchProducts} from "../../data/product_auto_fetch";

function PageHome() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts()
                if (response) {
                    const fetchedProducts = response.map((item: any) => ({
                        product_id: item.product_id,
                        product_name: item.product_name,
                        description: item.description || "",
                        keyPoints: item.keyPoints || "",
                        product_price: item.product_price,
                        image_url: `data:image/png;base64,${item.image_url}`,
                        image_url_2: `data:image/png;base64,${item.image_url_2}`,
                        image_url_3: `data:image/png;base64,${item.image_url_3}`,
                        category: item.category || "Unknown",
                        faq: item.faq || "",
                        howToUse: item.howToUse || "",
                        tags: item.tags ? item.tags.split(",") : [],
                        link: `/product-detail/${item.product_id}`,
                        variants: item.variants ? item.variants.split(",") : [],
                    }));
                    // @ts-ignore
                    setProducts(fetchedProducts);
                } else {
                    console.error("No data received from the API.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    // @ts-ignore
    return (
        <div className="nc-PageHome relative overflow-hidden">
            {/* SECTION HERO */}
            <SectionHero2 />

            {/*<div className="mt-24 lg:mt-32">*/}
            {/*  <DiscoverMoreSlider />*/}
            {/*</div>*/}

            <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
                {/* SECTION */}

                {products.length > 0 && (
                    <SectionSliderProductCard data={products}/>
                )}

                {/*How it work*/}
                {/* <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div> */}

                {/* SECTION  EARN FREE MONEY WITH CISECO*/}
                {/* <SectionPromo1 /> */}

                {/* SECTION  Start Exploring*/}
                {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

                {/* SECTION Whats trending now*/}
                {/* <SectionGridFeatureItems /> */}

                {/*  kids*/}
                {/* <SectionPromo2 /> */}

                {/* SECTION 3 */}
                <SectionSliderLargeProduct cardStyle="style2"/>

                {/*More collections*/}
                {/* <SectionSliderCategories /> */}

                {/* SECTION  */}
                {/* <SectionPromo3 /> */}


                {/* Best Seller */}
                {/* <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

                {/*blog*/}
                {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div> */}

                {/* GOOD NEWS on the way */}
                {/* <SectionClientSay /> */}
            </div>
        </div>
    );
}

export default PageHome;