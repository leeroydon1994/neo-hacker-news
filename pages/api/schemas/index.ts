import { gql } from "apollo-server-micro";

// Schemas
export const typeDefs = gql`
  type Query {
    news(page: Int!): [News!]!
  }
  type News {
    id: Int!
    title: String!
    points: Int!
    author: String!
    time: String!
    comments: Int!
    link: String!
  }
`;
