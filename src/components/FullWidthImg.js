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
  background-color: rgba(255,255,255,0.7);
  color: #444;
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
    <Title className="has-text-weight-bold is-size-2">{title}</Title>
  </FullWidthImg>
)
