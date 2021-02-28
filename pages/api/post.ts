import cheerio from "cheerio";
import axios from "axios";

const fetchHtml = async (url: string) => {
  try {
    // Fetch the site data
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export default async function scrapeHtml(page: string|number) {
  const newsArray = [];

  // Data scraping
  const url = `https://news.ycombinator.com/news?p=${page}`;
  const htmlData = await fetchHtml(url);

  const $ = cheerio.load(htmlData);

  let articleNumber = $(".storylink").length;

  // If content exists...
  if (articleNumber > 0) {
    // Rearranging the data in respective objects in an array
    for (let i = 0; i < articleNumber; i++) {
      const title = $(`.storylink:eq(${i})`).text();
      const time = $(`.age > a:eq(${i})`).text();

      const author = $(`.subtext:eq(${i})`).find(".hnuser").text().replace(/^$/, "Unknown");

      // For the id, change the type into number
      const idData = $(`.rank:eq(${i})`).text().replace(/\./gi, "");
      const id = parseInt(idData, 10);

      // For number of points, change the type into number
      const pointData = $(`.subtext:eq(${i})`)
        .find(".score")
        .text()
        .replace(/^$/, "0")
        .replace(/ points/gi, "");
      const points = parseInt(pointData, 10);

      // For comment count, change the type into number
      const commentData = $(`.subtext:eq(${i})`)
        .find(".subtext > a:last-child")
        .text()
        .replace(/^$/, "0")
        .replace(/comments/gi, "")
        .replace(/hide/gi, "0")
        .replace(/discuss/gi, "0")
        .trim();
      const comments = parseInt(commentData, 10);

      // For the link, judge if it starts with "item?id=", which means the link is inside the site's domain
      const linkData = $(`.storylink:eq(${i})`).attr("href");
      const link = /^item\?id=/.test(linkData) ? "https://news.ycombinator.com/" + linkData : linkData;

      // Push each pair into the array
      newsArray.push({
        id: id,
        title: title,
        points: points,
        author: author,
        time: time,
        comments: comments,
        link: link,
      });
    }
    // Sort the array
    newsArray.sort((a, b) => b.comments - a.comments);
    return newsArray;
  } else if (!articleNumber) {
    // If there is no content, return an empty array
    return [];
  }
}
