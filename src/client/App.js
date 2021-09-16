import React from "react";
import { renderRoutes } from "react-router-config";
import Header from "./components/Header";
import { fetchCurrentUser } from "./actions";

// any routes matched during the matchRoutes process will be passed as a prop to the App
// route.routes will display children routes
const App = ({ route }) => {
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
  // we call loadData in /index.js supplying store as an arg
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()),
};
