import * as cheerio from "cheerio";
import {
  EPOCHTIMER_SELECTOR,
  JP_LODESTONE_DOMAIN,
  LODESTONE,
  NEWSDATE_SELECTOR,
  NOTICELIST_SELECTOR,
  NOTICE_TEXT_SELECTOR,
  TOPICLIST_SELECTOR,
  TOPIC_DETAIL_SELECTOR,
} from "../consts/selectors";
import { getLodestoneTime } from "../helpers";
import { Notice } from "../types";
import { NEWS_BANNER_IMG } from "../consts/templates";

type News = "topic" | "notice";

async function loadHtml(targetUrl: string) {
  const response = await fetch(targetUrl);
  const html = await response.text();

  return cheerio.load(html);
}

function parseDate($: cheerio.CheerioAPI, elem: cheerio.Element) {
  const date = $(elem)
    .find(NEWSDATE_SELECTOR)
    .text()
    .split(EPOCHTIMER_SELECTOR)[1]
    .match(/\d+/g);
  return date;
}

async function getNoticeDetail(targetUrl: string) {
  const $ = await loadHtml(targetUrl);

  return $(NOTICE_TEXT_SELECTOR).text();
}

async function getNews(newsType: News): Promise<Notice[]> {
  const isTopic = newsType === "topic";
  const selector = isTopic ? TOPICLIST_SELECTOR : NOTICELIST_SELECTOR;
  const $ = await loadHtml(JP_LODESTONE_DOMAIN + LODESTONE);

  const parsedNews = $(selector)
    .map(async (_, news) => {
      const parsedDate = parseDate($, news);
      const date = getLodestoneTime(parsedDate![0]);
      const title = $(news).find("p").first().text();
      const imgUrl = isTopic
        ? $(news).find("img").attr("src")?.split("?")[0]
        : process.env.NEWS_BANNER_IMG!;
      const postUrl = JP_LODESTONE_DOMAIN + $(news).find("a").attr("href");
      const text = isTopic
        ? $(news).find(TOPIC_DETAIL_SELECTOR).text()
        : await getNoticeDetail(postUrl);

      return {
        title,
        date,
        imgUrl,
        text,
        postUrl,
      };
    })
    .toArray();

  return Promise.all(parsedNews);
}

export const getGlobalTopics = async () => {
  const topics = await getNews("topic");

  return topics.length > 5 ? topics.slice(0, 4) : topics;
};

export const getGlobalNotices = async () => {
  const notices = await getNews("notice");
  return notices;
};
