import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./all.sass";
import Seo from "./seo";

const TemplateWrapper = ({ children, title, image, description }) => (
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
        <Seo
          title={title || data.site.siteMetadata.title}
          image={image}
          description={description}
        />
        <Navbar />
        <div>{children}</div>
        <Footer />
      </div>
    )}
  />
);

export default TemplateWrapper;
