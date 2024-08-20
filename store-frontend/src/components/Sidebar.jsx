import React from "react";
import {
  SideBarContainer,
  SideBarFlexbox,
  SideBarFlexboxItem,
  SideBarFooter,
  SideBarFooterLinks,
  SideBarMainLink,
  SideBarMainLinks,
} from "../Styles/SideBarStyles";
import {
  NewsletterContainer,
  NewsletterEmailBtn,
  NewsletterEmailContainer,
  NewsletterEmailInput,
} from "../Styles/FooterStyles";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Div, Img, Paragraph } from "../StaticStyle";
import male from "../assets/Jeans/Male/Premium jeans/Light wash/jean1.webp"
import female from "../assets/Jeans/Female/Medium blue wash/jean19.webp"
import { useHomeContext } from "../context/HomeContext";

const Sidebar = () => {

    const {sideBarOpen} = useHomeContext()

  return (
    <SideBarContainer className={sideBarOpen === true ? "open" : sideBarOpen === false ? "closed" : ""}>
      <SideBarMainLinks>
        <SideBarMainLink>
          <Paragraph>NEW ARRIVALS</Paragraph>
        </SideBarMainLink>
        <SideBarMainLink>
          <Paragraph>BEST SELLERS</Paragraph>
        </SideBarMainLink>
        <SideBarMainLink>
          <Paragraph>MEN</Paragraph>
          <Div>
            <MdOutlineArrowRightAlt />
          </Div>
        </SideBarMainLink>
        <SideBarMainLink>
          <Paragraph>WOMEN</Paragraph>
          <Div>
            <MdOutlineArrowRightAlt />
          </Div>
        </SideBarMainLink>
        <SideBarMainLink className="last-call">
          <Paragraph>LAST CALL</Paragraph>
        </SideBarMainLink>
      </SideBarMainLinks>

      <SideBarFlexbox>
        <SideBarFlexboxItem>
            <Img src={male} />
            <Paragraph>MEN'S NEW ARRIVALS</Paragraph>
        </SideBarFlexboxItem>
        <SideBarFlexboxItem>
            <Img src={female} />
            <Paragraph>WOMEN'S NEW ARRIVALS</Paragraph>
        </SideBarFlexboxItem>
      </SideBarFlexbox>

      <SideBarFooter>
        <NewsletterContainer>
          <Paragraph>JOIN OUR NEWSLETTER</Paragraph>
          <Paragraph className="footer-email">EMAIL ADDRESS:</Paragraph>
          <NewsletterEmailContainer>
            <NewsletterEmailInput placeholder="ENTER YOUR EMAIL ADDRESS" />
            <NewsletterEmailBtn>SUBSCRIBE</NewsletterEmailBtn>
          </NewsletterEmailContainer>
        </NewsletterContainer>

        <SideBarFooterLinks>
          <Paragraph>LOG IN</Paragraph>
          <Paragraph>ABOUT US</Paragraph>
          <Paragraph>STORES</Paragraph>
          <Paragraph>EVENTS</Paragraph>
          <Paragraph>HELP</Paragraph>
          <Paragraph>REFER A FRIEND</Paragraph>
        </SideBarFooterLinks>
      </SideBarFooter>
    </SideBarContainer>
  );
};

export default Sidebar;
