import scrapeHtml from "../post";

// Revolvers
export const resolvers = {
  Query: {
    news: async (_parent: any, args: { page: string | number; }) => {
      try {
        const news = await scrapeHtml(args.page);
        return news;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
