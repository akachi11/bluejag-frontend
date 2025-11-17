import React, { useState } from "react";
import {
  CompanyFooterInfo,
  Div,
  DotSeperatedText,
  FooterContainer,
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
  FaSnapchat,
} from "react-icons/fa";

import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <CompanyFooterInfo className="md:w-[70%]">
        <Div>
          <NewsletterContainer>
            <Paragraph className="footer-email">TRACK YOUR ORDER:</Paragraph>
            <NewsletterEmailContainer>
              <NewsletterEmailInput
                onChange={(e) => {
                  setTrackingId(e.target.value);
                }}
                placeholder="ENTER YOUR TRACKING ID"
              />
              <NewsletterEmailBtn
                className={`${
                  trackingId.length < 6 ? "bg-blue-300" : "bg-blue-800"
                }`}
                disabled={trackingId.length < 6}
                onClick={() => {
                  navigate(`/order/${trackingId}`);
                  toggleSideBar();
                }}
              >
                FIND ORDER
              </NewsletterEmailBtn>
            </NewsletterEmailContainer>
          </NewsletterContainer>

          <FooterSocialsContainer>
            <FooterSocialsIcon
              onClick={() => {
                navigate("https://www.instagram.com/bluejagco");
              }}
            >
              <FaInstagram />
            </FooterSocialsIcon>
            {/* <FooterSocialsIcon>
              <FaFacebookF />
            </FooterSocialsIcon>
            <FooterSocialsIcon>
              <FaPinterestP />
            </FooterSocialsIcon> */}
            <FooterSocialsIcon
              onClick={() => {
                navigate("https://www.tiktok.com/@bluejag3");
              }}
            >
              <FaTiktok />
            </FooterSocialsIcon>
            <FooterSocialsIcon
              onClick={() => {
                navigate("https://snapchat.com/t/eg0YAIau");
              }}
            >
              <FaSnapchat />
            </FooterSocialsIcon>
            {/* <FooterSocialsIcon>
              <FaYoutube />
            </FooterSocialsIcon> */}
          </FooterSocialsContainer>
        </Div>

        {/* <Div>
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
        </Div> */}
      </CompanyFooterInfo>

      <SupportBox className="bg-gray-900">
        <Paragraph>bluejagltd@gmail.com</Paragraph>
        <a href="tel:+2349151658995">
          <Paragraph>09151658995</Paragraph>
        </a>
        {/* <Paragraph className="underline">visit a store</Paragraph> */}
      </SupportBox>

      <Policies>
        <Paragraph>
          {new Date().getFullYear()} Bluejag, Inc. All Rights Reserved
        </Paragraph>
        <DotSeperatedText>
          <Div>
            <Paragraph
              onClick={() => {
                navigate("/terms");
              }}
              className="cursor-pointer"
            >
              Terms
            </Paragraph>
            <LuDot />
            <Paragraph
              onClick={() => {
                navigate("/privacy");
              }}
              className="cursor-pointer"
            >
              Privacy policy
            </Paragraph>
            <LuDot />
          </Div>
          <Paragraph>Do not sell or share my personal information</Paragraph>
        </DotSeperatedText>
      </Policies>
    </FooterContainer>
  );
};

export default Footer;
