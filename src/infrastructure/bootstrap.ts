import { MemoryNewsRepository } from "@/core/repositories/MemoryNewsRepository";
import { Container } from "./container";
import { LineClient } from "./line/LineClient";
import { NewsService } from "@/core/services/NewsService";
import { CommandHandler } from "@/application/commands/CommandHandler";
import { ErrorHandler } from "@/presentation/api/webhook/ErrorHandler";
import { WebhookController } from "@/presentation/api/webhook/WebhookController";

export function bootstrap() {
  const container = Container.getInstance();
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;

  const lineClient = new LineClient(channelAccessToken);
  const newsRepository = new MemoryNewsRepository();
  const newsService = new NewsService(newsRepository);
  const commandHandler = new CommandHandler(newsService, lineClient);
  const errorHandler = new ErrorHandler(lineClient);
  const webhookController = new WebhookController(commandHandler, errorHandler);

  container.register("webhookController", webhookController);
}
