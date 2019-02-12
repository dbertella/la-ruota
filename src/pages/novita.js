import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import { Image } from '../components/Image'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 420px);
  justify-content: center;
  gap: 1rem 1rem;
  margin: 1rem 0;
`

const Time = styled.time`
  min-width: 100px;
  color: #888;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

export default class NewsPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <Layout>
        <Wrapper>
          {posts.map(({ node: post }) => (
            <div className="card" key={post.id}>
              <div className="card-image">
                <figure className="image">
                  <Image image={post.frontmatter.image} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <Flex className="media-content">
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <Time dateTime={post.frontmatter.date}>{post.frontmatter.date}</Time>
                  </Flex>
                </div>

                <div className="content">
                  <p>{post.excerpt}</p>
                  <br />
                  <Link className="button is-small" to={post.fields.slug}>
                    Leggi tutto →
                  </Link>
                  {post.frontmatter.tags && post.frontmatter.tags.length && (
                    <ul className="taglist">
                      {post.frontmatter.tags.map(tag => (
                        <li key={tag + `tag`} style={{ margin: 0 }}>
                          <Link to={`/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Wrapper>
      </Layout>
    )
  }
}

NewsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export const pageQuery = graphql`
  query NewsQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            image {
              childImageSharp {
                fluid(maxWidth: 420, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            date(formatString: "DD-MM-YYYY")
          }
        }
      }
    }
  }
`
