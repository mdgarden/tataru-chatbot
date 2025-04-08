import * as line from "@line/bot-sdk";
import { Message } from "@line/bot-sdk";

export class LineClient {
  private client: line.messagingApi.MessagingApiClient;

  constructor(channelAccessToken: string) {
    this.client = new line.messagingApi.MessagingApiClient({
      channelAccessToken,
    });
  }

  async replyMessage(replyToken: string, messages: Message[]): Promise<void> {
    await this.client.replyMessage({
      replyToken,
      messages,
    });
  }

  async leaveGroup(groupId: string): Promise<void> {
    await this.client.leaveGroup(groupId);
  }
}
