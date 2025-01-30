import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";
import FullWidthImg from "../components/FullWidthImg";
import Layout from "../components/Layout";
import { Helmet } from "react-helmet";

export const ContactPageTemplate = ({
  title,
  image,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <>
      <Helmet>
        <style>{`.tf-widget-button{opacity:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid;z-index:9999999;background-color:#fff;border-radius:4px;display:-webkit-box;display:-ms-flexbox;display:flex;height:42px;width:320px;border-color:hsl(174, 100%, 20%);color:hsl(174, 100%, 20%)}.tf-button-link{text-decoration:none;color:hsl(174, 100%, 20%);font-family:Raleway,sans-serif;font-size:1.1em;width:100%;text-align:center}.tf-button-link:hover{font-weight:700;background:none!important}`}</style>
      </Helmet>
      <FullWidthImg image={image} />
      <section className="section section--gradient">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="has-text-weight-semibold is-size-2">{title}</h1>
              <PageContent className="content" content={content} />

              <div className="tf-widget-button">
                <a
                  className="tf-button-link"
                  href="https://widget.thefork.com/0110df9b-74bd-441d-b80f-35057ccfa211"
                  target="_blank"
                  rel="noopener"
                >
                  Prenota un tavolo tramite the fork
                </a>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  contentComponent: PropTypes.func,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout title={post.frontmatter.title}>
      <ContactPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
      />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

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
`;
