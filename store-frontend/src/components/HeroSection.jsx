import React from 'react'
import { HeroButton, HeroImg, HeroMainText, HeroSectionContainer, HeroSubText, HeroTextContainer } from '../Styles/HeroSectionStyles'
import heroImg from "../assets/Shirts/shirt28.webp"
import BigButton from './BigButton'
import { themeColors } from '../Themes/themeColors'

const HeroSection = () => {
  return (
    <HeroSectionContainer>
      <HeroImg src={heroImg} />
      <HeroTextContainer>
        <HeroMainText>
          UNLEASH YOUR POTENTIAL WITH OUR ATHLETIC GEAR
        </HeroMainText>
        <HeroSubText>
          Skip right to the best parts of gym wears &mdash; lived-in comfort and excellent style, without the wait.
        </HeroSubText>
        <BigButton bg={themeColors.white} color={themeColors.mainBlue} title={"SHOP NOW"} />
      </HeroTextContainer>
    </HeroSectionContainer>
  )
}

export default HeroSection
