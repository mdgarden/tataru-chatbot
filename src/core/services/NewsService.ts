import { NewsNotFoundError } from "@/shared/errors/NewsError";
import { News } from "../domain/models/News";
import { INewsRepository } from "../repositories/INewsRepository";

export class NewsService {
  constructor(private newsRepository: INewsRepository) {}

  async getLatestNews(type?: "topic" | "notice"): Promise<News[]> {
    const news = await this.newsRepository.findAll();
    if (type) {
      return news.filter((item) => item.type === type);
    }
    return news;
  }

  async getNewsById(id: string): Promise<News> {
    const news = await this.newsRepository.findById(id);
    if (!news) {
      throw new NewsNotFoundError(id);
    }
    return news;
  }

  async createNews(news: News): Promise<News> {
    return this.newsRepository.save(news);
  }

  async deleteNews(news: News): Promise<void> {
    await this.newsRepository.delete(news);
  }
}
