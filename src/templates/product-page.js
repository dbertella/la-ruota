import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import FullWidthImg from "../components/FullWidthImg";
import { HTMLContent } from "../components/Content";

export const ProductPageTemplate = ({
  image,
  intro,
  main,
  fullImage,
  pricing,
}) => (
  <>
    <FullWidthImg image={image} />
    <section className="section section--gradient">
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h2 className="has-text-weight-semibold is-size-2">
              {pricing.heading}
            </h2>
            <Pricing data={pricing.plans} />
            <div className="columns">
              <div className="column is-7">
                <h1 className="has-text-weight-semibold is-size-2">
                  {intro.heading}
                </h1>
                <HTMLContent className="content" content={intro.description} />
              </div>
            </div>
            <Features gridItems={intro.blurbs} />
            <div className="columns">
              <div className="column is-7">
                <h3 className="has-text-weight-semibold is-size-3">
                  {main.heading}
                </h3>
                <p>{main.description}</p>
              </div>
            </div>
            <div className="tile is-ancestor">
              <div className="tile is-vertical">
                <div className="tile">
                  <div className="tile is-parent is-vertical">
                    <article className="tile is-child">
                      <PreviewCompatibleImage imageInfo={main.image1} />
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child">
                      <PreviewCompatibleImage imageInfo={main.image2} />
                    </article>
                  </div>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child">
                    <PreviewCompatibleImage imageInfo={main.image3} />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      className="full-width-image-container has-margin-top-0 has-margin-bottom-0"
      style={{
        backgroundImage: `url(${
          fullImage?.childImageSharp
            ? fullImage?.childImageSharp?.fluid?.src
            : fullImage
        })`,
      }}
    />
  </>
);

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    plans: PropTypes.array,
  }),
};

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout title={frontmatter.title}>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        fullImage={frontmatter.full_image}
        pricing={frontmatter.pricing}
      />
    </Layout>
  );
};

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default ProductPage;

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
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
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pricing {
          heading
          plans {
            items
            plan
          }
        }
      }
    }
  }
`;
