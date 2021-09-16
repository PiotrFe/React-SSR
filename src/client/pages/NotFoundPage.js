import React from "react";

// staticContext comes from StaticRouter (in helpers/renderer) - it is passed to every route it renders
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Oops, route not found</h1>;
};

export default {
  component: NotFoundPage,
};
