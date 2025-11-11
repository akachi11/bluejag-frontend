import styled from "styled-components";
import { devices } from "../responsiveness";
import { themeColors } from "../Themes/themeColors";

export const Div = styled.div``;

export const Paragraph = styled.p`
  &.underline {
    text-decoration: underline;
  }
`;

export const CompanyFooterInfo = styled.div`
  @media only screen and (${devices.tablet}) {
    display: flex;
    gap: 2rem;

    div {
      flex: 1;
    }
  }
`;

export const FooterContainer = styled.div`
  color: ${themeColors.white};
  font-size: 1rem;
  padding: 0.5rem 1rem;

  @media only screen and (${devices.tablet}) {
    padding: 2rem 4rem;
  }
`;

export const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-weight: 900;

  .footer-email {
    font-size: 0.8rem;
  }

  p {
    margin-top: 1rem;
    font-family: "Poppins", sans-serif;

    @media only screen and (${devices.tablet}) {
      font-size: 1.5rem;
    }
  }

  @media only screen and (${devices.tablet}) {
    .footer-email {
      font-size: 1rem;
    }
  }
`;

export const NewsletterEmailContainer = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-family: "Montserrat", sans-serif;

  @media only screen and (${devices.tablet}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const NewsletterEmailInput = styled.input`
  background-color: ${themeColors.white};
  border-radius: 3px;
  color: ${themeColors.textBlue};
  padding: 0.7rem;
  font-size: 0.9rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;

  &::placeholder {
    color: ${themeColors.textBlue};
  }

  @media only screen and (${devices.tablet}) {
    flex: 9;
  }
`;

export const NewsletterEmailBtn = styled.button`
  background-color: ${themeColors.lightestBlue};
  color: ${themeColors.buttonTextBlue};
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  padding: 0.7rem;
  font-size: 0.9rem;
  border-radius: 3px;
  cursor: pointer;

  @media only screen and (${devices.tablet}) {
    flex: 3;
  }
`;

export const FooterMenuContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  margin-top: 1.5rem;
`;

export const FooterMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media only screen and (${devices.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FooterMenuItem = styled.li`
  list-style: none;
  width: 100%;
`;

export const FooterMenuItemInput = styled.input`
  display: none;

  &:checked + label + div {
    max-height: 5rem;
    padding: 10px 10px 0px;

    @media only screen and (${devices.tablet}) {
      padding: 0;
      max-height: fit-content;
    }
  }

  &:checked + label::after {
    content: "-";

    @media only screen and (${devices.tablet}) {
      content: "";
    }
  }
`;

export const FooterMenuItemHeader = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  display: flex;
  align-items: center;

  &::after {
    content: "+";
    margin-left: auto;
    font-size: 1.5rem;

    @media only screen and (${devices.tablet}) {
      content: "";
    }
  }

  @media only screen and (${devices.tablet}) {
    font-size: 1.3rem;
  }
`;

export const FooterMenuItemSub = styled.div`
  line-height: 26px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s, padding 0.5s;

  @media only screen and (${devices.tablet}) {
    max-height: max-content;
  }
`;

export const FooterMenuItemSubItem = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;

  @media only screen and (${devices.tablet}) {
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

export const FooterSocialsContainer = styled.div`
  width: fit-content;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  @media only screen and (${devices.tablet}) {
    margin: 1.5rem 0 0 0;
  }
`;

export const FooterSocialsIcon = styled.div`
  background-color: ${themeColors.white};
  color: ${themeColors.mainBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;

  @media only screen and (${devices.tablet}) {
    font-size: 1.5rem;
    padding: 0.7rem;
  }
`;

export const SupportBox = styled.div`
  margin: 1.5rem 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;

  @media only screen and (${devices.tablet}) {
    flex-direction: row;
    padding: 1rem;
    justify-content: center;
    gap: 2rem;
  }
`;

export const Policies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 0.5rem;
  text-transform: uppercase;
  font-weight: 700;

  @media only screen and (${devices.tablet}) {
    font-size: 0.9rem;
  }
`;

export const DotSeperatedText = styled.div`
  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (${devices.tablet}) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
