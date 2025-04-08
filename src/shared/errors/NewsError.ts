import { AppError } from "./AppError";

export class NewsNotFoundError extends AppError {
  constructor(newsId: string) {
    super(`News with id ${newsId} not found`, 404, "NEWS_NOT_FOUND");
  }
}
