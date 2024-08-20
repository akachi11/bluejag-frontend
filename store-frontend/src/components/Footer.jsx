import {
  CompanyFooterInfo,
  Div,
  DotSeperatedText,
  FooterContainer,
  FooterMenu,
  FooterMenuContainer,
  FooterMenuItem,
  FooterMenuItemHeader,
  FooterMenuItemInput,
  FooterMenuItemSub,
  FooterMenuItemSubItem,
  FooterSocialsContainer,
  FooterSocialsIcon,
  NewsletterContainer,
  NewsletterEmailBtn,
  NewsletterEmailContainer,
  NewsletterEmailInput,
  Paragraph,
  Policies,
  SupportBox,
} from "../Styles/FooterStyles";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

import { LuDot } from "react-icons/lu";

const Footer = () => {
  return (
    <FooterContainer>
      <CompanyFooterInfo>
        <Div>
          <NewsletterContainer>
            <Paragraph>JOIN OUR NEWSLETTER</Paragraph>
            <Paragraph className="footer-email">EMAIL ADDRESS:</Paragraph>
            <NewsletterEmailContainer>
              <NewsletterEmailInput placeholder="ENTER YOUR EMAIL ADDRESS" />
              <NewsletterEmailBtn>SUBSCRIBE</NewsletterEmailBtn>
            </NewsletterEmailContainer>
          </NewsletterContainer>

          <FooterSocialsContainer>
            <FooterSocialsIcon>
              <FaInstagram />
            </FooterSocialsIcon>
            <FooterSocialsIcon>
              <FaFacebookF />
            </FooterSocialsIcon>
            <FooterSocialsIcon>
              <FaPinterestP />
            </FooterSocialsIcon>
            <FooterSocialsIcon>
              <FaTiktok />
            </FooterSocialsIcon>
            <FooterSocialsIcon>
              <FaYoutube />
            </FooterSocialsIcon>
          </FooterSocialsContainer>
        </Div>

        <Div>
          <FooterMenuContainer>
            <FooterMenu>
              <FooterMenuItem>
                <FooterMenuItemInput
                  type="checkbox"
                  id="first"
                  name="accordion"
                />
                <FooterMenuItemHeader for="first">SHOP</FooterMenuItemHeader>
                <FooterMenuItemSub>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                </FooterMenuItemSub>
              </FooterMenuItem>

              <FooterMenuItem>
                <FooterMenuItemInput
                  type="checkbox"
                  id="second"
                  name="accordion"
                />
                <FooterMenuItemHeader for="second">SHOP</FooterMenuItemHeader>
                <FooterMenuItemSub>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                </FooterMenuItemSub>
              </FooterMenuItem>

              <FooterMenuItem>
                <FooterMenuItemInput
                  type="checkbox"
                  id="third"
                  name="accordion"
                />
                <FooterMenuItemHeader for="third">SHOP</FooterMenuItemHeader>
                <FooterMenuItemSub>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                  <FooterMenuItemSubItem>MENU</FooterMenuItemSubItem>
                </FooterMenuItemSub>
              </FooterMenuItem>
            </FooterMenu>
          </FooterMenuContainer>
        </Div>
      </CompanyFooterInfo>

      <SupportBox>
        <Paragraph>hello@bluejag.com</Paragraph>
        <Paragraph>833-bluejag(833-832-6827)</Paragraph>
        <Paragraph className="underline">visit a store</Paragraph>
      </SupportBox>

      <Policies>
        <Paragraph>2024 Bluejag, Inc. All Rights Reserved</Paragraph>
        <DotSeperatedText>
          <Div>
            <Paragraph>Terms</Paragraph>
            <LuDot />
            <Paragraph>Privacy policy</Paragraph>
            <LuDot />
            <Paragraph>Canada privacy</Paragraph>
            <LuDot />
            <Paragraph>Accessibility</Paragraph>
          </Div>
          <Paragraph>Do not sell or share my personal information</Paragraph>
        </DotSeperatedText>
      </Policies>
    </FooterContainer>
  );
};

export default Footer;
