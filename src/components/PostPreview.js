import React from "react";
import { kebabCase } from "lodash";
import { Link } from "gatsby";
import { Image } from "../components/Image";
import styled from "styled-components";

const Time = styled.time`
  min-width: 100px;
  color: #888;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostPreview = ({ post }) => {
  return (
    <div className="card" key={post.id}>
      <div className="card-image">
        <figure className="image">
          <Link to={post.fields.slug}>
            <Image image={post.frontmatter.image} />
          </Link>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <Flex className="media-content">
            <Link className="has-text-primary" to={post.fields.slug}>
              {post.frontmatter.title}
            </Link>
            <Time dateTime={post.frontmatter.date}>
              {post.frontmatter.date}
            </Time>
          </Flex>
        </div>

        <div className="content">
          <p>{post.excerpt}</p>
          <br />
          <Link className="button is-small preview-button" to={post.fields.slug}>
            Leggi tutto →
          </Link>
          {post.frontmatter.tags && post.frontmatter.tags.length && (
            <ul className="taglist">
              {post.frontmatter.tags.map((tag) => (
                <li key={tag + `tag`} style={{ margin: 0 }}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>#{tag}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
