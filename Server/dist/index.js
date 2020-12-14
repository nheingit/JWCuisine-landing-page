"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const express = require("express");
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const session = require("express-session");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.typeDefs,
        resolvers: resolvers_1.resolvers,
        context: ({ req }) => ({ req })
    });
    yield typeorm_1.createConnection();
    const app = express();
    app.use(session({
        secret: "thissupersecretpassword",
        resave: false,
        saveUninitialized: false
    }));
    server.applyMiddleware({ app, cors: {
            credentials: true,
            origin: "http://localhost:3000"
        } });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
startServer();
//# sourceMappingURL=index.js.map