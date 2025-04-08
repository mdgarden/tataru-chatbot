import { News } from "../domain/models/News";
import { INewsRepository } from "./INewsRepository";

export class MemoryNewsRepository implements INewsRepository {
  private newsMap: Map<string, News> = new Map();

  async findAll(): Promise<News[]> {
    return Array.from(this.newsMap.values());
  }

  async findById(id: string): Promise<News | null> {
    return this.newsMap.get(id) || null;
  }

  async save(news: News): Promise<News> {
    this.newsMap.set(news.id, news);
    return news;
  }

  async delete(news: News): Promise<void> {
    this.newsMap.delete(news.id);
  }
}
