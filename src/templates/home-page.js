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

export const HomePageTemplate = ({ title, subtitle, content, contentComponent }) => {
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
                <h1 className="title is-3">{title}</h1>
                <h2 className="subtitle is-4">{subtitle}</h2>
              </div>
            </div>

            <PageContent className="content" content={content} />
          </div>
        </Absolute>
      </Relative>
    </>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(post)
  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        content={post.html}
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
  }
`
