import React from "react";
import {
  BodyHeaderOne,
  NewArrivalItem,
  NewArrivalItemDesc,
  NewArrivalItemDescBottom,
  NewArrivalItemDescTop,
  NewArrivalItemImg,
  NewArrivalItemImgBg,
  NewArrivalItemName,
  NewArrivalItemPrice,
  NewArrivalsContainer,
  NewArrivalsFlexbox,
  SpecialInfo,
} from "../Styles/NewArrivalsStyles";
import boot from "../assets/Boots/The Annie/Cafe/Annie1.webp";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const NewArrivals = () => {

    const [img, setImg] = useState()

  const getProducts = async () => {
    await axios
      .get("http://localhost:5000/api/product/get-products")
      .then((res) => {
        console.log(res.data[0].descriptionImage)
        setImg(res.data[0].descriptionImage)
      });
  };

  useEffect(() => {
    getProducts()
  })

  return (
    <NewArrivalsContainer>
      <BodyHeaderOne>NEW ARRIVALS</BodyHeaderOne>

      <NewArrivalsFlexbox>
        <NewArrivalItem>
          <SpecialInfo>LIMITED EDITION</SpecialInfo>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={img} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>

        <NewArrivalItem>
          <NewArrivalItemImgBg>
            <NewArrivalItemImg src={boot} />
          </NewArrivalItemImgBg>

          <NewArrivalItemDesc>
            <NewArrivalItemDescTop>
              <NewArrivalItemName>THE ANNIE</NewArrivalItemName>
              <NewArrivalItemPrice>$365</NewArrivalItemPrice>
            </NewArrivalItemDescTop>

            <NewArrivalItemDescBottom>
              WOMEN'S TAN GOAT COWGIRL BOOT
            </NewArrivalItemDescBottom>
          </NewArrivalItemDesc>
        </NewArrivalItem>
      </NewArrivalsFlexbox>
    </NewArrivalsContainer>
  );
};

export default NewArrivals;
