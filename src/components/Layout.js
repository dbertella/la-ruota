import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./all.sass";
import SEO from "./seo";

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <SEO title={data.site.siteMetadata.title} />
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    )}
  />
);

export default TemplateWrapper;
