import { NewsService } from "@/core/services/NewsService";
import { MemoryNewsRepository } from "@/core/repositories/MemoryNewsRepository";
import { News } from "@/core/domain/models/News";
import { NewsNotFoundError } from "@/shared/errors/NewsError";

describe("NewsService", () => {
  let newsService: NewsService;
  let newsRepository: MemoryNewsRepository;

  beforeEach(() => {
    newsRepository = new MemoryNewsRepository();
    newsService = new NewsService(newsRepository);
  });

  describe("getLatestNews", () => {
    it("should return empty array when no news exists", async () => {
      const news = await newsService.getLatestNews();
      expect(news).toEqual([]);
    });

    it("should return all news", async () => {
      const testNews = News.create(
        "Test Title",
        "Test Content",
        "https://example.com"
      );
      await newsRepository.save(testNews);

      const news = await newsService.getLatestNews();
      expect(news).toHaveLength(1);
      expect(news[0].title).toBe("Test Title");
    });
  });

  describe("getNewsById", () => {
    it("should throw NewsNotFoundError when news does not exist", async () => {
      await expect(newsService.getNewsById("non-existent-id")).rejects.toThrow(
        NewsNotFoundError
      );
    });

    it("should return news when it exists", async () => {
      const testNews = News.create(
        "Test Title",
        "Test Content",
        "https://example.com"
      );
      await newsRepository.save(testNews);

      const news = await newsService.getNewsById(testNews.id);
      expect(news).toBeInstanceOf(News);
      expect(news.title).toBe("Test Title");
    });
  });

  describe("createNews", () => {
    it("should create and return new news", async () => {
      const news = await newsService.createNews(
        "Test Title",
        "Test Content",
        "https://example.com"
      );

      expect(news).toBeInstanceOf(News);
      expect(news.title).toBe("Test Title");
      expect(news.content).toBe("Test Content");
      expect(news.sourceUrl).toBe("https://example.com");
    });
  });

  describe("deleteNews", () => {
    it("should delete existing news", async () => {
      const testNews = News.create(
        "Test Title",
        "Test Content",
        "https://example.com"
      );
      await newsRepository.save(testNews);

      await newsService.deleteNews(testNews.id);
      await expect(newsService.getNewsById(testNews.id)).rejects.toThrow(
        NewsNotFoundError
      );
    });
  });
});
