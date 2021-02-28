import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ schema }).createHandler({
  path: "/api/graphql",
});
