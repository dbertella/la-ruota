import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components";
import { PostPreview } from "../components/PostPreview";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 420px);
  justify-content: center;
  gap: 1rem 1rem;
  margin: 1rem 0;
`;

export default class NewsPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    return (
      <Layout>
        <Wrapper>
          {posts.map(({ node: post }) => (
            <PostPreview post={post} key={post.id} />
          ))}
        </Wrapper>
      </Layout>
    );
  }
}

NewsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

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
`;
