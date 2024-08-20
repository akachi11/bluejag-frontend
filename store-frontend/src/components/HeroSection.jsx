import React from 'react'
import { HeroButton, HeroImg, HeroMainText, HeroSectionContainer, HeroSubText, HeroTextContainer } from '../Styles/HeroSectionStyles'
import heroImg from "../assets/Shirts/shirt28.webp"

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
        <HeroButton>
          SHOP NOW
        </HeroButton>
      </HeroTextContainer>
    </HeroSectionContainer>
  )
}

export default HeroSection
