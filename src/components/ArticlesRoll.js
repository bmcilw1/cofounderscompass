import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import { ArticleCard } from "./ArticleCard";

class ArticlesRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: articles } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {articles &&
          articles.map(({ node: article }) => (
            <div className="is-parent column is-6" key={article.id}>
              <ArticleCard article={article} />
            </div>
          ))}
      </div>
    );
  }
}

ArticlesRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query ArticlesRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "article-page" } } }
        ) {
          edges {
            node {
              excerpt(format: HTML, pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredPost
                featuredImage {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 120, quality: 30) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  alt
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ArticlesRoll data={data} count={count} />}
  />
);
