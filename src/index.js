import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    }, // this option is for the course's API (using Google's OAuth - no need to use it outside the course)
  })
);
app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req);

  // matchRoutes takes an array of routes and a url and return an array of routes that are about to be rendered
  // we now know what we try to access without actually rendering the components
  // each route can optionally have a loadData function that fetches data
  // we can use that function to fetch data before the component gets rendered
  // otherwise we would render a component withouth data pertaining to it (and would pontentially need to rerender it once the data is fetches - a very costly operation)

  // structure of array returned by matchRoutes:
  // [
  //   {
  //     route: {
  //       loadData: [Function: loadData],
  //       path: '/users',
  //       component: [Function]
  //     },
  //     match: { path: '/users', url: '/users', isExact: true, params: {} }
  //   }
  // ]

  // Once all promises from loadData functions have resolved, we can proceed with rendering

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null; // redux store gets populated with data on each call
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      // context gets url assigned to it when a router renders Redirect component (which may happen in components/hoc/requireAuth)
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }
    res.send(content); // now store is populated, we can render
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
