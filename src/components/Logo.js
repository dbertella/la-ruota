import React from "react";
import styled from "styled-components";
import logo from "../img/170 - logo - def - boxato.svg";

const LogoWrapper = styled.div`
  box-sizing: border-box;
  display: block;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
  width: 100px;
  height: 100px;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  max-height: none !important;
`;

export const Logo = () => (
  <LogoWrapper>
    <Img src={logo} alt="La Ruota Imperia" />
  </LogoWrapper>
);
