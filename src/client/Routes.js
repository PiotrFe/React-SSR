import React from "react";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import App from "./App";
import NotFoundPage from "./pages/NotFoundPage";
import AdminsListPage from "./pages/AdminsListPage";

export default [
  {
    ...App, // no path tied to the component, so will always be displayed on the screen;
    // renderRoutes (from renderer component) will understand that these are routes of the App component
    // the App component will be passed the child component (under routes) as prop
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true,
      },
      {
        ...AdminsListPage,
        path: "/admins",
      },
      {
        ...UsersListPage,
        path: "/users",
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
