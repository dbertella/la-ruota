import React from 'react'
import styled from 'styled-components'

export const FullWidthImg = styled.div`
  height: 400px;
  background-size: cover;
  background-position: top;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
`

const Title = styled.h1`
  box-shadow: 0.5rem 0 0 #f40, -0.5rem 0 0 #f40;
  background-color: #f40;
  color: white;
  padding: 1rem;
`

export default ({ title, image }) => (
  <FullWidthImg
    style={{
      backgroundImage: `url(${
        !!image.childImageSharp ? image.childImageSharp.fluid.src : image
      })`
    }}
  >
    <Title className="has-text-weight-bold is-size-1">{title}</Title>
  </FullWidthImg>
)
