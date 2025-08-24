import React, { useState } from "react";
import {
  AccordionClickable,
  DPPImages,
  DPPInfo,
  MaterialInfo,
  MobileProductPage,
  PColor,
  ProductAccordion,
  ProductColors,
  ProductDetails,
  ProductImg,
  ProductKey,
  ProductNamePrice,
  ProductPageContainer,
  ProductRating,
  ProductSize,
  ProductTop,
  ProductValue,
  ProductsAccordionContainer,
  RatingSection,
  SizeBox,
  SizeTop,
  SizesFlexbox,
} from "../Styles/ProductPage";
import { HRCStars } from "../Styles/HomeReviewStyles";
import { stars } from "../utils";
import img1 from "../assets/Shirts/shirt10.webp";
import img2 from "../assets/Shirts/shirt11.webp";
import img3 from "../assets/Shirts/shirt12.webp";
import ImageSlider from "../components/ImagesSlider";
import { GoBookmarkSlash } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { IconContainer } from "../Styles/ComponentStyles";
import { SpecialInfo } from "../Styles/HomeSlideStyles";
import { themeColors } from "../Themes/themeColors";
import BigButton from "../components/BigButton";
import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";
import GoinBlue from "../components/GoinBlue";
import HomeSlide from "../components/NewArrivals";
import RatingSummary from "../components/RatingSummary";

const images = [img1, img2, img3];

const ProductPage = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState();

  const accordionTitles = ["details", "materials", "care"];
  const Ratings = {
    1: 0,
    2: 7/50,
    3: 15/50,
    4: 8/50,
    5: 20/50,
  }

  return (
    <ProductPageContainer>
      <MobileProductPage>
        <DPPImages>
          {Array.from({ length: 4 }, (_, i) => (
            <>
              <img src={img1} alt="" />
              <img src={img2} alt="" />
              <img src={img3} alt="" />
            </>
          ))}
        </DPPImages>

        <DPPInfo>
          <ProductTop>
            <ProductNamePrice>
              <p className="name">THE WYATT</p>
              <p className="price">$545</p>
            </ProductNamePrice>

            <ProductRating>
              <p className="rating">4.85</p>
              <HRCStars className="product">{stars(4.5)}</HRCStars>
              <p className="raters">5,668</p>
            </ProductRating>
          </ProductTop>

          <ProductImg>
            <IconContainer
              onClick={() => setBookmarked(!bookmarked)}
              className="bookmark"
            >
              {bookmarked ? <GoBookmarkFill /> : <GoBookmarkSlash />}
            </IconContainer>
            <SpecialInfo>LIMITED EDITION</SpecialInfo>
            <ImageSlider images={images} />
          </ProductImg>

          <MaterialInfo>
            <div>
              <ProductKey>COLOR: &nbsp;</ProductKey>
              <ProductValue>DARK WASH</ProductValue>
            </div>

            <div>
              <ProductKey>MATERIAL:&nbsp;</ProductKey>
              <ProductValue>DENIM</ProductValue>
            </div>
          </MaterialInfo>

          <ProductColors>
            {Array.from({ length: 4 }, (_, i) => (
              <PColor color={themeColors.lastCallRed}>
                <div></div>
              </PColor>
            ))}
          </ProductColors>

          <ProductSize>
            <ProductKey>Size:</ProductKey>
            <SizeTop>
              <div>
                <ProductValue className="small">
                  *RUNS BIG: ORDER HALF SIZE DOWN
                </ProductValue>
                <ProductValue className="small red">
                  SIZE SOLD OUT? SELECT SIZE TO GET NOTIFIED
                </ProductValue>
              </div>

              <ProductValue className="fit-guide">FIT GUIDE</ProductValue>
            </SizeTop>

            <SizesFlexbox>
              {Array.from({ length: 5 }, (_, i) => (
                <>
                  <SizeBox className="sold-out">
                    <div>5.5</div>
                  </SizeBox>

                  <SizeBox>
                    <div>5.5</div>
                  </SizeBox>
                </>
              ))}
            </SizesFlexbox>
          </ProductSize>

          <ProductKey className="shipping">
            Free shipping on orders of $100+
          </ProductKey>

          <BigButton
            title="SELECT YOUR SIZE"
            bg={themeColors.mainBlue}
            color={themeColors.white}
          />

          <ProductDetails>
            <div>
              <p className="title">THE MUST-HAVE SWEATSHIRT</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                veniam magni quidem, est assumenda quis ex porro nisi ad sit
                commodi corrupti laudantium doloribus sunt enim quos
                exercitationem repellendus aliquid ipsam eligendi eius veritatis
                omnis dignissimos. Laborum, praesentium odit? Sint culpa nisi
                libero quae quod eveniet accusantium. Quo, sed rem!
              </p>
            </div>

            <ProductsAccordionContainer>
              {accordionTitles.map((title, i) => (
                <ProductAccordion className={openAccordion === i ? "open" : ""}>
                  <AccordionClickable
                    onClick={() => {
                      openAccordion === i
                        ? setOpenAccordion(undefined)
                        : setOpenAccordion(i);
                    }}
                  >
                    <p>{title}</p>
                    {openAccordion === i ? <LiaMinusSolid /> : <LiaPlusSolid />}
                  </AccordionClickable>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facere ut, porro dignissimos deserunt necessitatibus maxime
                    at odio voluptates cumque fuga.
                  </p>
                </ProductAccordion>
              ))}
            </ProductsAccordionContainer>
          </ProductDetails>
        </DPPInfo>
      </MobileProductPage>

      <HomeSlide title={"Complete the look"} />
      <GoinBlue />
      <RatingSection>
        <RatingSummary ratings={Ratings} />
      </RatingSection>
    </ProductPageContainer>
  );
};

export default ProductPage;
