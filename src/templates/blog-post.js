import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import FullWidthImg from "../components/FullWidthImg";
import showdown from "showdown";
import styled from "styled-components";

const RecipeBox = styled.div`
  margin: 1.5rem 0 3rem;
  padding: 2rem;
  border: 1px solid #4a3400;
  display: inline-block;
`;

const RecipeList = styled.ul`
  @media (min-width: 768px) {
    column-count: 2;
    column-gap: 2rem;
  }
`;

const converter = new showdown.Converter();

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  image,
  recipe,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <>
      <FullWidthImg image={image} />
      <section className="section">
        {helmet || ""}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="has-text-weight-semibold is-size-2">{title}</h1>
              {recipe ? (
                <RecipeBox>
                  <strong>{recipe.heading}</strong>
                  <RecipeList>
                    {recipe.ingredients.map(i => (
                      <li
                        key={i.item}
                        dangerouslySetInnerHTML={{
                          __html: converter.makeHtml(i.item)
                        }}
                      ></li>
                    ))}
                  </RecipeList>
                </RecipeBox>
              ) : null}
              <PostContent content={content} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        helmet={
          <Helmet titleTemplate="%s | Novità">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        recipe={post.frontmatter.recipe}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
        recipe {
          heading
          ingredients {
            item
          }
        }
      }
    }
  }
`;
