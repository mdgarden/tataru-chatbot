import * as cheerio from "cheerio";
import {
  EPOCHTIMER_SELECTOR,
  JP_LODESTONE_DOMAIN,
  LODESTONE,
  NOTICELIST_SELECTOR,
  TOPICLIST_SELECTOR,
} from "./consts/selectors";
import { getLodestoneTime } from "./helpers";

// news : 상위 카테고리
// topic, notice : 하위 카테고리
export const getGlobalNews = async () => {
  // Fetch the HTML content of the web page to be scraped
  const response = await fetch(JP_LODESTONE_DOMAIN + LODESTONE);
  const html = await response.text();

  // Load the HTML content into Cheerio
  const $ = cheerio.load(html);

  // Use Cheerio selectors to extract the desired data
  const noticeList = $(NOTICELIST_SELECTOR)
    .map((_, notice) => {
      const date = $(notice)
        .find(".news__list--time")
        .text()
        .split(EPOCHTIMER_SELECTOR)[1]
        .match(/\d+/g);

      const formattedDate = date?.length && getLodestoneTime(date[0]);

      return {
        title: $(notice).find("p").text(),
        date: formattedDate,
        postUrl: JP_LODESTONE_DOMAIN + $(notice).find("a").attr("href"),
        text: "",
      };
    })
    .toArray();

  const topicList = $(TOPICLIST_SELECTOR)
    .slice(0, 3)
    .map((_, topic) => {
      const date = $(topic)
        .find(".news__list--time")
        .text()
        .split(EPOCHTIMER_SELECTOR)[1]
        .match(/\d+/g);

      const formattedDate = date?.length && getLodestoneTime(date[0]);

      return {
        title: $(topic).find("a").first().text(),
        date: formattedDate,
        postUrl: JP_LODESTONE_DOMAIN + $(topic).find("a").first().attr("href"),
        imgUrl: $(topic)
          .find("img")
          .attr("src")
          ?.split(/.png|.jpg/)[0],
        text: $(topic).find("p.mdl-text__xs-m16").text(),
      };
    })
    .toArray();

  // Return the scraped data as a JSON response
  // res.status(200).json({ title, links });
};
