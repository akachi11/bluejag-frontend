import styled from "styled-components";
import { themeColors } from "../Themes/themeColors";
import { devices } from "../responsiveness";

export const HomeCardContainer = styled.div`
    padding: .5rem;
`;

export const HomeCardDiv = styled.div`
    padding: 2rem;
`;

export const HomeCardLogo = styled.div`
    width: 50%;
    display: flex;
    margin: auto;
    margin-bottom: 1rem;

    @media only screen and (${devices.tablet}) {
        width: 6rem;
    }

    img {
        width: 100%;
    }
`;

export const HomeCardHeader = styled.p`
    line-height: 2rem;
    text-align: center;

    @media only screen and (${devices.laptop}) {
        font-size: 2.5rem;
    }
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


    @media only screen and (${devices.laptop}) {
        padding: 0 5rem;
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

    @media only screen and (${devices.laptop}) {
        font-size: .9rem;
    }
`;
