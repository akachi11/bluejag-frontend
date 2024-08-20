import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const HomeCardContainer = styled.div`
    background-color: ${themeColors.homeCardBlue};
    padding: .5rem;
    color: ${themeColors.mainBlue};
`;

export const HomeCardDiv = styled.div`
    border: 3px solid ${themeColors.mainBlue};
    padding: 2rem;
    font-family: "Poppins", sans-serif;
`;

export const HomeCardLogo = styled.div`
    width: 50%;
    display: flex;
    margin: auto;
    margin-bottom: 1rem;

    @media only screen and (${devices.tablet}) {
        width: 20%;
    }

    img {
        width: 100%;
    }
`;

export const HomeCardHeader = styled.p`
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 2rem;
    text-align: center;
`;

export const HomeCardFlexbox = styled.div`
    text-align: center;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    @media only screen and (${devices.tablet}) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const HomeCardFlexItem = styled.div`
`;

export const HomeCardSubheader = styled.p`
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: .5rem;
`;

export const HomeCardText = styled.p`
    font-weight: 500;
`;
