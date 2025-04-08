import { News } from "../../../../core/domain/models/News";

describe("News", () => {
  it("should create a news instance with valid data", () => {
    const news = News.create(
      "Test Title",
      "Test Content",
      "https://example.com",
      "https://example.com/image.jpg"
    );

    expect(news).toBeInstanceOf(News);
    expect(news.title).toBe("Test Title");
    expect(news.content).toBe("Test Content");
    expect(news.sourceUrl).toBe("https://example.com");
    expect(news.imageUrl).toBe("https://example.com/image.jpg");
    expect(news.date).toBeInstanceOf(Date);
  });

  it("should create a news instance without image URL", () => {
    const news = News.create(
      "Test Title",
      "Test Content",
      "https://example.com"
    );

    expect(news).toBeInstanceOf(News);
    expect(news.imageUrl).toBeUndefined();
  });
});
