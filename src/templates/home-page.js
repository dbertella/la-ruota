import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { get, take } from "lodash";
import Slider from "react-slick";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Content, { HTMLContent } from "../components/Content";
import Layout from "../components/Layout";
import { Image } from "../components/Image";

const Relative = styled.div`
  position: relative;
  max-width: 100%;
  overflow-x: hidden;
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
  grid-template-columns: 320px;
  grid-template-rows: 320px;
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  justify-content: center;
  @media (min-width: 768px) {
    grid-template-columns: 320px 320px;
  }
  @media (min-width: 1088px) {
    grid-template-columns: 320px 320px 320px;
  }
`;
const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 270px;
  overflow: auto;
  padding: 1rem;
  transform: translateY(100%);
  background: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  transition: transform 0.5s ease-in-out, background 0.5s ease-in-out;
`;

const Card = styled(Relative)`
  height: 320px;
  width: 320px;
  overflow: hidden;
  &:hover {
    ${Overlay} {
      transform: translateY(0%);
    }
  }
`;

const IG_ID = "3643692171"; // `laruotaim`

// https://github.com/oorestisime/gatsby-source-instagram/blob/master/src/instagram.js
const igUrl = (username) =>
  `https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${username}","first":12,"after":null}`;

export const HomePageTemplate = ({
  title,
  subtitle,
  carousel,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;
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

  const [allInsta, setAllInsta] = useState([]);
  useEffect(() => {
    fetch(igUrl(IG_ID))
      .then((j) => j.json())
      .then(({ data }) => {
        const photos = [];
        data.user.edge_owner_to_timeline_media.edges.forEach((edge) => {
          if (edge.node) {
            photos.push({
              id: edge.node.shortcode,
              thumbnail: edge.node.thumbnail_resources[2].src,
              caption: edge.node.edge_media_to_caption.edges[0].node.text,
            });
          }
        });
        setAllInsta(photos);
      });
  }, []);

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
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Grid>
                {take(
                  allInsta.map(({ id, thumbnail, caption }) => (
                    <a
                      href={`https://www.instagram.com/p/${id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={id}
                    >
                      <Card>
                        <img src={thumbnail} alt={caption} />
                        <Overlay>
                          <div>{caption}</div>
                        </Overlay>
                      </Card>
                    </a>
                  )),
                  9
                )}
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  carousel: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  instaFeed: PropTypes.object,
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout title={post.frontmatter.title}>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        carousel={post.frontmatter.carousel}
        content={post.html}
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
  }
`;
