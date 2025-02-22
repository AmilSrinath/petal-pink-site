import React, {FC, useEffect, useState} from "react";
import bg from "../../img/homeScreenImg/SVG file 01.15.02.svg";

import ButtonPrimary from "shared/Button/ButtonPrimary";
import Next from "shared/NextPrev/Next";
import Prev from "shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import axios from "axios";

interface Hero2DataType {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  btn_link: string;
}

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [banners, setBanners] = useState<Hero2DataType[]>([]);
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  const serverUrl = process.env.NEXT_PUBLIC_REACT_APP_API_SERVER_URL;
  console.log(">>>>>>>>>> : ",serverUrl)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`https://petalpink.lk/api/configuration/getAllBanners`);
        setBanners(response.data.banners);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  useInterval(
    () => {
      handleAutoNext();
    },
    isRunning ? 5500 : null
  );
  //

  const handleAutoNext = () => {
    setIndexActive((state) => {
      if (state >= banners.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= banners.length - 1) {
        return 0;
      }
      return state + 1;
    });
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return banners.length - 1;
      }
      return state - 1;
    });
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }
    TIME_OUT = setTimeout(() => {
      toggleIsRunning(true);
    }, 1000);
  };

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = banners[index];
    if (!isActive) {
      return null;
    }
    return (
      <div
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden ${className}`}
        key={index}
      >
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center">
          {banners.map((_, index) => {
            const isActive = indexActive === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setIndexActive(index);
                  handleAfterClick();
                }}
                className={`relative px-1 py-1.5 cursor-pointer`}
              >
                <div
                  className={`relative w-20 h-1 shadow-sm rounded-md bg-white`}
                >
                  {isActive && (
                    <div
                      className={`nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md ${
                        isActive ? " " : " "
                      }`}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Prev
          className="absolute left-1 sm:left-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute right-1 sm:right-5 top-3/4 sm:top-1/2 sm:-translate-y-1/2 z-10 !text-slate-700"
          btnClassName="w-12 h-12 hover:border-slate-400 dark:hover:border-slate-400"
          svgSize="w-6 h-6"
          onClickNext={handleClickNext}
        />

        {/* BG */}
        <div className="absolute inset-0 bg-[#E3FFE6] dark:bg-gray-400">
          {/* <div className="absolute inset-0 bg-[#F7F0EA]"> */}
          <img
            className="absolute w-full h-full object-contain"
            src={bg}
            alt="hero"
          />
        </div>

        <div className="relative container pb-0 pt-14 sm:pt-20 lg:py-44">
          <div
            className={`relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 nc-SectionHero2Item__left`}
          >
            <div className="space-y-5 sm:space-y-6">
              <h2 className="nc-SectionHero2Item__heading font-semibold text-3xl sm:text-4xl md:text-4xl xl:text-4xl 2xl:text-5xl !leading-[114%] text-slate-900">
                {item.title}
              </h2>
              <span className="nc-SectionHero2Item__subheading block text-base md:text-xl text-slate-700 font-medium">
                {item.subtitle}
              </span>
            </div>

            <ButtonPrimary
                className="nc-SectionHero2Item__button"
                sizeClass="py-3 px-6 sm:py-5 sm:px-9"
                href={item.btn_link as any}
            >
              <span>Explore now</span>
              <span>
                <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
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
            </ButtonPrimary>
          </div>
          <div className="mt-10 lg:mt-0 lg:absolute right-0 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            <img
              className="w-full h-full object-contain object-right-bottom nc-SectionHero2Item__image"
              src={item.image_url}
              alt={item.title}
            />
          </div>
        </div>
      </div>
    );
  };

  return <>{banners.map((_, index) => renderItem(index))}</>;
};

export default SectionHero2;
