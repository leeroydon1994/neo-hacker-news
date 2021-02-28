import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default async (req:any, res:any) => {
  const page = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query {
          news(page: ${page}) {
            id
            title
            points
            author
            time
            comments
            link
          }
        }
      `,
    });
    // console.log({ news: data.news });
    res.status(200).json({ news: data.news });
  } catch (error) {
    console.error(error);
  }
};
