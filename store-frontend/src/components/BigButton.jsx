import React from 'react'
import { HeroButton } from '../Styles/HeroSectionStyles'

const BigButton = ({title, bg, color}) => {
  return (
    <HeroButton bg={bg} color={color}>
        {title}
    </HeroButton>
  )
}

export default BigButton
