import { WebhookEvent } from "@line/bot-sdk";
import { CommandHandler } from "../../../application/commands/CommandHandler";
import { ErrorHandler } from "./ErrorHandler";

export class WebhookController {
  constructor(
    private commandHandler: CommandHandler,
    private errorHandler: ErrorHandler
  ) {}

  async handleWebhook(event: WebhookEvent): Promise<void> {
    if (event.type === "message" && event.message.type === "text") {
      await this.handleTextMessage(event);
    }
  }

  private async handleTextMessage(event: WebhookEvent): Promise<void> {
    if (event.type !== "message" || event.message.type !== "text") {
      return;
    }

    try {
      await this.commandHandler.handleCommand(
        event.message.text,
        event.replyToken,
        event
      );
    } catch (error) {
      await this.errorHandler.handleError(error, event.replyToken);
    }
  }
}
