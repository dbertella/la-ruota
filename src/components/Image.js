import React from 'react'
import Img from 'gatsby-image'

export const Image = ({ image }) => {
  if (!image) {
    return null
  }
  if (typeof image === 'string') {
    return <img src={image} alt="" />
  }
  return (
    <Img
      fluid={image.childImageSharp.fluid}
      alt=""
    />
  )
}
