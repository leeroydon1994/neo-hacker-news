import { gql } from "apollo-server-micro";

// Schemas
export const typeDefs = gql`
  type Query {
    news(page: Int!): [News!]!
  }
  type News {
    id: String!
    title: String!
    points: String!
    author: String!
    time: String!
    comments: String!
    link: String!
  }
`;
