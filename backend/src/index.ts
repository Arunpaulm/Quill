import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";
import cors from 'cors';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';

dotenv.config({ path: path.resolve(__dirname, "./../.env") });

import "./services/passportConfig";

import { connectDB } from "./config/db";
import { authRouter } from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { bookRouter } from "./routes/bookRoutes";

import { typeDefs, resolvers } from './graphql';
// import schemas from "./graphql/schemas"

const app = express();
const port = process.env.PORT || 3000;
// const passportService = require("./services/passportConfig")(passport);

const apolloserver = new ApolloServer({
  typeDefs, resolvers,
  validationRules: [depthLimit(7)],
  introspection: true,
  // context: (passport.authenticate('auth', { session: false }))
});

function init() {
  return new Promise<Number>((resolve, reject) => {
    console.log("Initialising server start sequence")
    resolve(1)
  });
}

init()
  .then(() => {
    // Connect to MongoDB
    connectDB();
  })
  .then(async () => {

    app.use('*', cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(compression());


    // Initialize Passport and restore authentication state, if any, from the session
    app.use(passport.initialize());
    app.use(passport.session());

    // Login/Auth Route
    app.use("/auth", authRouter);

    // Routes for controllers
    app.use("/users", userRouter);

    app.use(passport.authenticate('auth', { session: false }));

    app.use("/books", bookRouter);

    // Initialize graphql in path /graphql
    await apolloserver.start();
    apolloserver.applyMiddleware({ app, path: '/graphql' });
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Server is ready at http://localhost:${port}${apolloserver.graphqlPath}`);
    });
  })
  .catch((error: Error) => {
    console.log("Initialising server start sequence Failed")
    console.log(error)
    process.exit(1)
  })

// export default app
module.exports = app





