import React from "react";
import {
  HomeCardContainer,
  HomeCardDiv,
  HomeCardFlexItem,
  HomeCardFlexbox,
  HomeCardHeader,
  HomeCardLogo,
  HomeCardSubheader,
  HomeCardText,
} from "../Styles/HomeCardStyles";
import { Img } from "../StaticStyle";
import logo from "../assets/head-01-01.png";

const HomeCard = () => {
  return (
    <HomeCardContainer className="bg-blue-950 montserrat">
      <HomeCardDiv>
        <HomeCardLogo>
          <Img src={logo} />
        </HomeCardLogo>
        <HomeCardHeader className="text-2xl font-bold">
          GYM TIME! WELCOME TO BLUEJAG
        </HomeCardHeader>

        <HomeCardFlexbox>
          <HomeCardFlexItem>
            <HomeCardSubheader>NO EXCUSES, JUST RESULTS</HomeCardSubheader>
            <HomeCardText>
              Every rep counts. Every drop of sweat is proof. You don’t stop
              till it’s done.
            </HomeCardText>
          </HomeCardFlexItem>
          <HomeCardFlexItem>
            <HomeCardSubheader>DISCIPLINE IS THE REAL FLEX</HomeCardSubheader>
            <HomeCardText>
              Forget motivation — show up. That’s what separates the talkers
              from the doers.
            </HomeCardText>
          </HomeCardFlexItem>
          <HomeCardFlexItem>
            <HomeCardSubheader>FOR THOSE WHO PUT IN THE WORK</HomeCardSubheader>
            <HomeCardText>
              If you know, you know. Gym is therapy, body is proof.
            </HomeCardText>
          </HomeCardFlexItem>
        </HomeCardFlexbox>
      </HomeCardDiv>
    </HomeCardContainer>
  );
};

export default HomeCard;
