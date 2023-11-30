import * as cheerio from "cheerio";

const NOTICELIST_SELECTOR =
  ".toptabchanger_newsbox:first-child ul:nth-of-type(2) li";
const NOTICE_OBJ = "";
const TOPICLIST_SELECTOR = ".news__list--topics_top li";

export const getGlobalNotice = async () => {
  // Fetch the HTML content of the web page to be scraped
  const response = await fetch("https://jp.finalfantasyxiv.com/lodestone/");
  const html = await response.text();

  // Load the HTML content into Cheerio
  const $ = cheerio.load(html);

  // Use Cheerio selectors to extract the desired data
  const noticeList = $(NOTICELIST_SELECTOR)
    .map((_, notice) => {
      return {
        title: $(notice).find("p").text(),
        link: $(notice).find("a").attr("href"),
      };
    })
    .toArray();

  const topicList = $(TOPICLIST_SELECTOR)
    .slice(0, 3)
    .map((_, topic) => {
      return {
        title: $(topic).find("a").first().text(),
        link: $(topic).find("a").first().attr("href"),
      };
    })
    .toArray();

  // Return the scraped data as a JSON response
  // res.status(200).json({ title, links });
};
