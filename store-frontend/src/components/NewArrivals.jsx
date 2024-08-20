import React from 'react'
import { BodyHeaderOne, NewArrivalItem, NewArrivalItemDesc, NewArrivalItemDescBottom, NewArrivalItemDescTop, NewArrivalItemImg, NewArrivalItemImgBg, NewArrivalItemName, NewArrivalItemPrice, NewArrivalsContainer, NewArrivalsFlexbox, SpecialInfo } from '../Styles/NewArrivalsStyles'
import boot from "../assets/Boots/The Annie/Cafe/Annie1.webp"

const NewArrivals = () => {
  return (
    <NewArrivalsContainer>
        <BodyHeaderOne>NEW ARRIVALS</BodyHeaderOne>

        <NewArrivalsFlexbox>
            <NewArrivalItem>
                <SpecialInfo>LIMITED EDITION</SpecialInfo>
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
  )
}

export default NewArrivals
