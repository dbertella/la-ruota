import React from 'react'
import styled from 'styled-components'
import { Instagram } from './Instagram'
import { Facebook } from './Facebook'

const WHITE_COLOR = '#eaeaea';

const Copiright = styled.div`
  background: #444;
  color: ${WHITE_COLOR};
`
const WhiteText = styled.div`
  color: ${WHITE_COLOR};
`
const WhiteLink = styled.a`
  color: #fff;
  &:hover {
    color: ${WHITE_COLOR};
  }
`
const InstagramWhite = styled(Instagram)`
  fill: ${WHITE_COLOR};
`
const FacebookWhite = styled(Facebook)`
  fill: ${WHITE_COLOR};
`

const FooterTitle = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`

const Flex = styled.div`
  display: flex;
`

function Footer() {
  return (
    <>
      <footer className="footer" role="contentinfo">
        <WhiteText className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="columns">
                <div className="column">
                  <div itemScope="" itemType="http://schema.org/Restaurant">
                    <FooterTitle>
                      <span itemProp="name">Ristorante La Ruota</span>{' '}
                    </FooterTitle>
                    <div
                      itemProp="address"
                      itemScope=""
                      itemType="http://schema.org/PostalAddress"
                    >
                      <span itemProp="streetAddress">Largo spianata varese 25</span>,{' '}
                      <span itemProp="postalCode">18100</span>
                      <br />
                      <span itemProp="addressLocality">Imperia</span>,{' '}
                      <span itemProp="addressRegion">IM</span>
                      <p>
                        Tel: <span itemProp="telephone">0183 61206</span>
                        <br />
                        Email: <span itemProp="email">info@laruotaimperia.com</span>
                        <br />
                        <WhiteLink itemProp="url" href="http://www.laruotaimperia.com">
                          www.laruotaimperia.com
                        </WhiteLink>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <FooterTitle>
                    <span>Orari</span> <span className="footer-icon" id="orari" />
                  </FooterTitle>
                  <p>
                    <meta itemProp="openingHours" content="Mo-Su 12:00-14:30" />
                    Lun-Dom 12:30 - 14:30
                    <br />
                    <meta itemProp="openingHours" content="Mo-Su 18:00-21:30" />
                    Lun-Dom 19:30 - 21:30
                  </p>
                  <br />
                  <p>
                    <meta itemProp="closingDays" content="Th" />
                    Giovedì chiuso
                  </p>
                </div>
                <div className="column">
                  <FooterTitle>Seguici</FooterTitle>
                  <Flex>
                    <a
                      className="navbar-item"
                      href="https://www.instagram.com/laruotaim/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="icon">
                        <InstagramWhite />
                      </span>
                    </a>
                    <a
                      className="navbar-item"
                      href="https://www.facebook.com/laruotaimperia/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="icon">
                        <FacebookWhite />
                      </span>
                    </a>
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </WhiteText>
      </footer>
      <div>
        <div
          itemProp="aggregateRating"
          itemScope=""
          itemType="http://schema.org/AggregateRating"
          style={{ display: 'none' }}
        >
          Valutazione: <span itemProp="ratingValue">4.5</span> -{' '}
          <span itemProp="reviewCount">121</span> recensioni
        </div>
        <Copiright className="source-org copyright has-text-centered">
          © {new Date().getFullYear()} Ristorante La Ruota – Imperia.
        </Copiright>
      </div>
    </>
  )
}

export default Footer
