import * as cheerio from "cheerio";
import {
  EPOCHTIMER_SELECTOR,
  JP_LODESTONE_DOMAIN,
  LODESTONE,
  NEWSDATE_SELECTOR,
  NOTICELIST_SELECTOR,
  NOTICE_TEXT_SELECTOR,
  TOPICLIST_SELECTOR,
} from "./consts/selectors";
import { getLodestoneTime } from "./helpers";
import { NoticeProps } from "./types";

type News = "topic" | "notice";

async function loadHtml(targetUrl: string) {
  const response = await fetch(targetUrl);
  const html = await response.text();
  const $ = cheerio.load(html);

  return $;
}

function parseDate($: cheerio.CheerioAPI, elem: cheerio.Element) {
  return $(elem)
    .find(NEWSDATE_SELECTOR)
    .text()
    .split(EPOCHTIMER_SELECTOR)[1]
    .match(/\d+/g);
}

async function getNoticeDetail(targetUrl: string) {
  const $ = await loadHtml(targetUrl);

  return $(NOTICE_TEXT_SELECTOR).text();
}

const getNews = async (newsType: News) => {
  const isTopic = newsType === "topic";
  const selector = isTopic ? TOPICLIST_SELECTOR : NOTICELIST_SELECTOR;
  const $ = await loadHtml(JP_LODESTONE_DOMAIN + LODESTONE);

  const parsedNews = $(selector)
    .map(async (_, news) => {
      const date = parseDate($, news as cheerio.Element);
      const formattedDate = date?.length && getLodestoneTime(date[0]);
      const postUrl = JP_LODESTONE_DOMAIN + $(news).find("a").attr("href");
      const text = isTopic
        ? $(news).find("p.mdl-text__xs-m16").text()
        : await getNoticeDetail(postUrl);

      return {
        title: $(news).find("p").text(),
        date: formattedDate,
        imgUrl: isTopic
          ? $(news)
              .find("img")
              .attr("src")
              ?.split(/.png|.jpg/)[0]
          : "",
        text,
        postUrl,
      };
    })
    .toArray();

  return Promise.all(parsedNews);
};

export const getGlobalTopics = async () => {
  const topics = await getNews("topic");

  return topics;
};

export const getGlobalNotices = async () => {
  const notices = await getNews("notice");

  return notices;
};
