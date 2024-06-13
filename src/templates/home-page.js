import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get } from "lodash";
import Slider from "react-slick";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Content, { HTMLContent } from "../components/Content";
import Layout from "../components/Layout";
import { Image } from "../components/Image";
import { PostPreview } from "../components/PostPreview";

const Relative = styled.div`
  position: relative;
  max-width: 100%;
  overflow: hidden;
  max-height: 500px;
`;
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
`;
const Title = styled.h1`
  font-size: 2.7rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const SubTitle = styled.h2`
  margin-top: -1.25rem;
  color: #4a3400;
  font-weight: 800;
  font-size: 1.3rem;
`;
const WrapPageContent = styled.div`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 320px 320px 320px;
  justify-content: center;
  gap: 1rem 1rem;
  margin: 1rem 0;
`;

const settings = {
  dots: true,
  infinite: true,
  fade: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 10000,
  cssEase: "linear",
};

export const HomePageTemplate = ({
  title,
  subtitle,
  carousel,
  content,
  contentComponent,
  posts,
}) => {
  const PageContent = contentComponent || Content;
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
          {carousel.map(({ image }) => (
            <Image
              key={get(image, "childImageSharp.fluid.src", image)}
              image={image}
            />
          ))}
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
      <Grid>
        {posts.map(({ node: post }) => (
          <PostPreview post={post} key={post.id} />
        ))}
      </Grid>
    </>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  carousel: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  posts: PropTypes.array,
};

const HomePage = ({ data }) => {
  const { markdownRemark: post, allMarkdownRemark } = data;

  console.log(allMarkdownRemark);
  return (
    <Layout title={post.frontmatter.title}>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        carousel={post.frontmatter.carousel}
        content={post.html}
        posts={allMarkdownRemark.edges}
      />
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HomePage;

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        carousel {
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: 3
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
