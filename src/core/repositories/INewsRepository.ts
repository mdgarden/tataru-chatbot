import { News } from "../domain/models/News";

export interface INewsRepository {
  findAll(): Promise<News[]>;
  findById(id: string): Promise<News | null>;
  save(news: News): Promise<News>;
  delete(news: News): Promise<void>;
}
