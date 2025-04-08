import { LineClient } from "../../../infrastructure/line/LineClient";
import { MessageBuilder } from "../../../shared/utils/MessageBuilder";
import { AppError } from "../../../shared/errors/AppError";
import { TextMessage } from "@line/bot-sdk";

export class ErrorHandler {
  constructor(private lineClient: LineClient) {}

  async handleError(error: unknown, replyToken: string): Promise<void> {
    const message = this.createErrorMessage(error);
    await this.lineClient.replyMessage(replyToken, [message]);
  }

  private createErrorMessage(error: unknown): TextMessage {
    if (error instanceof AppError) {
      return MessageBuilder.createTextMessage(error.message);
    }

    console.error("Error handling text message:", error);
    return MessageBuilder.createTextMessage("서버 오류가 발생했습니다.");
  }
}
