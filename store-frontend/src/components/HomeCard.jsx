import React from 'react'
import { HomeCardContainer, HomeCardDiv, HomeCardFlexItem, HomeCardFlexbox, HomeCardHeader, HomeCardLogo, HomeCardSubheader, HomeCardText } from '../Styles/HomeCardStyles'
import { Img } from '../StaticStyle'
import logo from "../assets/head-01-01.png"

const HomeCard = () => {
  return (
    <HomeCardContainer>
        <HomeCardDiv>
            <HomeCardLogo>
                <Img src={logo} />
            </HomeCardLogo>
            <HomeCardHeader>
                GYM TIME! WELCOME TO BLUEJAG
            </HomeCardHeader>

            <HomeCardFlexbox>
                <HomeCardFlexItem>
                    <HomeCardSubheader>BORN IN THE EAST</HomeCardSubheader>
                    <HomeCardText>In everything we do, we work to honor the true spirit of the West.</HomeCardText>
                </HomeCardFlexItem>
                <HomeCardFlexItem>
                    <HomeCardSubheader>TREAT 'EM RIGHT</HomeCardSubheader>
                    <HomeCardText>We hang our hat on quality, hospitality and shooting you straight.</HomeCardText>
                </HomeCardFlexItem>
                <HomeCardFlexItem>
                    <HomeCardSubheader>Y'ALL MEANS ALL</HomeCardSubheader>
                    <HomeCardText>Our West is wide open and big enough for anyone bold enough to go.</HomeCardText>
                </HomeCardFlexItem>
            </HomeCardFlexbox>
        </HomeCardDiv>
    </HomeCardContainer>
  )
}

export default HomeCard
