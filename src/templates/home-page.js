import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import Layout from '../components/Layout'
import pic from '../img/la-foce.png'
import pic2 from '../img/la-foce-notte.png'
import pic3 from '../img/la-ruota.png'
import Slider from 'react-slick'
import Helmet from 'react-helmet'

export const HomePageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Helmet>
      <Slider {...settings}>
        <img src={pic} alt="la foce" />
        <img src={pic2} alt="la foce notte" />
        <img src={pic3} alt="la ruota" />
      </Slider>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {title}
                </h2>
                <PageContent className="content" content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
}

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
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
      }
    }
  }
`
