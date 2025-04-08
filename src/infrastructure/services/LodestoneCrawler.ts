import * as cheerio from "cheerio";
import { News } from "../../core/domain/models/News";
import {
  EPOCHTIMER_SELECTOR,
  JP_LODESTONE_DOMAIN,
  LODESTONE,
  NEWSDATE_SELECTOR,
  NOTICELIST_SELECTOR,
  NOTICE_TEXT_SELECTOR,
  TOPICLIST_SELECTOR,
  TOPIC_DETAIL_SELECTOR,
} from "../../app/utils/consts/selectors";
import { getLodestoneTime } from "../../app/utils/helpers";
import { NEWS_BANNER_IMG } from "../../app/utils/consts/templates";

export class LodestoneCrawler {
  private async loadHtml(url: string) {
    const response = await fetch(url);
    const html = await response.text();
    return cheerio.load(html);
  }

  private async getNoticeDetail(targetUrl: string) {
    const $ = await this.loadHtml(targetUrl);
    return $(NOTICE_TEXT_SELECTOR).text();
  }

  private parseDate($: cheerio.CheerioAPI, element: cheerio.Element) {
    return $(element).find(NEWSDATE_SELECTOR).text().match(EPOCHTIMER_SELECTOR);
  }

  private async getNews(newsType: "topic" | "notice"): Promise<News[]> {
    const isTopic = newsType === "topic";
    const selector = isTopic ? TOPICLIST_SELECTOR : NOTICELIST_SELECTOR;
    const $ = await this.loadHtml(JP_LODESTONE_DOMAIN + LODESTONE);

    const parsedNews = $(selector)
      .map(async (_, news) => {
        const parsedDate = this.parseDate($, news);
        const date = getLodestoneTime(parsedDate![0]);
        const title = $(news).find("p").first().text();
        const imgUrl = isTopic
          ? $(news).find("img").attr("src")?.split("?")[0]
          : NEWS_BANNER_IMG;
        const postUrl = JP_LODESTONE_DOMAIN + $(news).find("a").attr("href");
        const text = isTopic
          ? $(news).find(TOPIC_DETAIL_SELECTOR).text()
          : await this.getNoticeDetail(postUrl);

        return News.fromLodestoneData({
          title,
          date,
          text,
          imgUrl,
          postUrl,
          type: newsType,
        });
      })
      .toArray();

    return Promise.all(parsedNews);
  }

  async getTopics(): Promise<News[]> {
    const topics = await this.getNews("topic");
    return topics.length > 5 ? topics.slice(0, 4) : topics;
  }

  async getNotices(): Promise<News[]> {
    return this.getNews("notice");
  }
}
