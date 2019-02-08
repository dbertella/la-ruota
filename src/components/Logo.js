import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.jpg'

const LogoWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  width: 150px;
  height: 150px;
`

const Img = styled.img`
    height: 100%;
    width: 100%;
    max-height: none !important;
`

export const Logo = () => (
  <LogoWrapper>
    <Img src={logo} alt="La Ruota Imperia" />
  </LogoWrapper>
)
