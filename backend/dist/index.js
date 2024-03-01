"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "./../.env") });
require("./services/passportConfig");
const db_1 = require("./config/db");
const authRoutes_1 = require("./routes/authRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const bookRoutes_1 = require("./routes/bookRoutes");
const graphql_1 = require("./graphql");
// import schemas from "./graphql/schemas"
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// const passportService = require("./services/passportConfig")(passport);
const apolloserver = new apollo_server_express_1.ApolloServer({
    typeDefs: graphql_1.typeDefs, resolvers: graphql_1.resolvers,
    validationRules: [(0, graphql_depth_limit_1.default)(7)],
    introspection: true,
    // context: (passport.authenticate('auth', { session: false }))
});
function init() {
    return new Promise((resolve, reject) => {
        console.log("Initialising server start sequence");
        resolve(1);
    });
}
init()
    .then(() => {
    // Connect to MongoDB
    (0, db_1.connectDB)();
})
    .then(async () => {
    app.use('*', (0, cors_1.default)());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(body_parser_1.default.json());
    app.use((0, compression_1.default)());
    // Initialize Passport and restore authentication state, if any, from the session
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Login/Auth Route
    app.use("/auth", authRoutes_1.authRouter);
    // Routes for controllers
    app.use("/users", userRoutes_1.userRouter);
    app.use(passport_1.default.authenticate('auth', { session: false }));
    app.use("/books", bookRoutes_1.bookRouter);
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
    .catch((error) => {
    console.log("Initialising server start sequence Failed");
    console.log(error);
    process.exit(1);
});
// export default app
module.exports = app;
