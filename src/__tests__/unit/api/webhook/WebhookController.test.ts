import { WebhookController } from "@/presentation/api/webhook/WebhookController";
import { WebhookEvent } from "@line/bot-sdk";
import { News } from "@/core/domain/models/News";
import * as line from "@line/bot-sdk";

// LINE API 모의
jest.mock("@line/bot-sdk", () => ({
  messagingApi: {
    MessagingApiClient: jest.fn().mockImplementation(() => ({
      replyMessage: jest.fn().mockResolvedValue(undefined),
      leaveGroup: jest.fn().mockResolvedValue(undefined),
    })),
  },
}));

describe("WebhookController", () => {
  let webhookController: WebhookController;
  const mockChannelAccessToken = "test-token";

  beforeEach(() => {
    webhookController = new WebhookController(mockChannelAccessToken);
  });

  describe("handleWebhook", () => {
    it("should handle text message event", async () => {
      const events: WebhookEvent[] = [
        {
          type: "message",
          message: {
            type: "text",
            text: "뉴스",
            quoteToken: "test-quote-token",
          },
          replyToken: "test-reply-token",
          source: {
            type: "user",
            userId: "test-user-id",
          },
          timestamp: 1234567890,
        } as WebhookEvent,
      ];

      await webhookController.handleWebhook(events);
      expect(line.messagingApi.MessagingApiClient).toHaveBeenCalledWith({
        channelAccessToken: mockChannelAccessToken,
      });
    });

    it("should handle leave group command", async () => {
      const events: WebhookEvent[] = [
        {
          type: "message",
          message: {
            type: "text",
            text: "나가기",
            quoteToken: "test-quote-token",
          },
          replyToken: "test-reply-token",
          source: {
            type: "group",
            groupId: "test-group-id",
          },
          timestamp: 1234567890,
        } as WebhookEvent,
      ];

      await webhookController.handleWebhook(events);
      expect(line.messagingApi.MessagingApiClient).toHaveBeenCalledWith({
        channelAccessToken: mockChannelAccessToken,
      });
    });

    it("should ignore non-text message events", async () => {
      const events: WebhookEvent[] = [
        {
          type: "message",
          message: {
            type: "image",
            id: "test-image-id",
            contentProvider: {
              type: "line",
            },
          },
          replyToken: "test-reply-token",
          source: {
            type: "user",
            userId: "test-user-id",
          },
          timestamp: 1234567890,
        } as WebhookEvent,
      ];

      await webhookController.handleWebhook(events);
      expect(line.messagingApi.MessagingApiClient).toHaveBeenCalledWith({
        channelAccessToken: mockChannelAccessToken,
      });
    });
  });
});
