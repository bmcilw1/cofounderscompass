import React from "react";
import PropTypes from "prop-types";
import { ArticlePageTemplate } from "../../templates/article-page";

const ArticlePagePreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.getIn(["data"]).toJS();

  return (
    <ArticlePageTemplate
      content={widgetFor("body")}
      description={data.description}
      tags={data.tags}
      title={data.title}
      featuredImage={{
        image: getAsset(data.featuredImage?.image).toString(),
        alt: data.featuredImage?.alt,
      }}
      date={data.date?.toString()}
    />
  );
};

ArticlePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  getAsset: PropTypes.func,
};

export default ArticlePagePreview;
