import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Content, { HTMLContent } from '../components/Content'
import ContactForm from '../components/ContactForm'
import FullWidthImg from '../components/FullWidthImg'
import Layout from '../components/Layout'

export const ContactPageTemplate = ({ title, image, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <>
      <FullWidthImg image={image} />
      <section className="section section--gradient">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="has-text-weight-semibold is-size-2">{title}</h1>
              <PageContent className="content" content={content} />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  contentComponent: PropTypes.func
}

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
