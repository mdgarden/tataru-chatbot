import { MessageBuilder } from "@/shared/utils/MessageBuilder";
import { News } from "@/core/domain/models/News";
import { TextMessage, FlexMessage } from "@line/bot-sdk";

describe("MessageBuilder", () => {
  describe("createTextMessage", () => {
    it("should create a text message", () => {
      const text = "Test Message";
      const message = MessageBuilder.createTextMessage(text);

      expect(message).toEqual<TextMessage>({
        type: "text",
        text,
      });
    });
  });

  describe("createNewsFlexMessage", () => {
    it("should create a flex message with news data", () => {
      const news = News.create(
        "Test Title",
        "Test Content",
        "https://example.com",
        "https://example.com/image.jpg"
      );

      const message = MessageBuilder.createNewsFlexMessage(news);

      expect(message).toEqual<FlexMessage>({
        type: "flex",
        altText: news.title,
        contents: expect.objectContaining({
          type: "bubble",
          size: "mega",
          header: expect.objectContaining({
            contents: expect.arrayContaining([
              expect.objectContaining({
                text: news.title,
              }),
            ]),
          }),
          body: expect.objectContaining({
            contents: expect.arrayContaining([
              expect.objectContaining({
                text: news.content,
              }),
            ]),
          }),
        }),
      });
    });

    it("should use default banner image when imageUrl is not provided", () => {
      const news = News.create(
        "Test Title",
        "Test Content",
        "https://example.com"
      );
      const message = MessageBuilder.createNewsFlexMessage(news);
      const bubble = message.contents as { hero: { url: string } };

      expect(bubble.hero.url).toBe(
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIfzcW%2FbtsBMTD7RCs%2FywJJY7RpoKb1acdgNJNiLK%2Fimg.png"
      );
    });
  });
});
