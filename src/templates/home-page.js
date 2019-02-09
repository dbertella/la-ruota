import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import pic from '../img/la-foce.png'
import pic2 from '../img/la-foce-notte.png'
import pic3 from '../img/la-ruota.png'
import Slider from 'react-slick'
import Helmet from 'react-helmet'

const Relative = styled.div`
  position: relative;
`
const Absolute = styled.div`
  margin: 2rem 1rem 1rem;
  @media (min-width: 1088px) {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.9) !important;
    margin: 0;
  }
`
const Title = styled.h1`
  font-size: 2.7rem;
  font-weight: 600;
  margin-bottom: 1rem;
`
const SubTitle = styled.h2`
  margin-top: -1.25rem;
  margin-bottom: 1.5rem;
  color: #888;
  font-weight: 800;
  font-size: 1.3rem;
`
const WrapPageContent = styled.div`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
`
const Card = styled.div`
  @media (min-width: 1088px) {
    float: left;
    width: 33.33333%;
  }
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`

export const HomePageTemplate = ({
  title,
  subtitle,
  content,
  contentComponent,
  instaFeed
}) => {
  const PageContent = contentComponent || Content
  var settings = {
    dots: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    cssEase: 'linear'
  }
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Helmet>
      <Relative>
        <Slider {...settings}>
          <img src={pic} alt="la foce" />
          <img src={pic2} alt="la foce notte" />
          <img src={pic3} alt="la ruota" />
        </Slider>
        <Absolute className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <Title>{title}</Title>
                <SubTitle>{subtitle}</SubTitle>
              </div>
            </div>
            <WrapPageContent>
              <PageContent content={content} />
            </WrapPageContent>
          </div>
        </Absolute>
      </Relative>
      <section className="section">
        <div className="container">
          {instaFeed.edges.map(({ node }) => (
            <Card key={node.id}>
              <img src={node.thumbnails[2].src} alt={node.caption} />
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  instaFeed: PropTypes.object
}

const HomePage = ({ data }) => {
  const { markdownRemark: post, allInstaNode } = data
  console.log(allInstaNode)
  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        content={post.html}
        instaFeed={allInstaNode}
      />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired
}

export default HomePage

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
      }
    }
    allInstaNode {
      edges {
        node {
          id
          likes
          comments
          original
          timestamp
          caption
          localFile {
            childImageSharp {
              fixed(width: 150, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          # Only available with the public api scraper
          thumbnails {
            src
            config_width
            config_height
          }
          dimensions {
            height
            width
          }
        }
      }
    }
  }
`
