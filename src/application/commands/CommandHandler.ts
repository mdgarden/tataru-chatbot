import { NewsService } from "../../core/services/NewsService";
import { LineClient } from "../../infrastructure/line/LineClient";
import { MessageBuilder } from "../../shared/utils/MessageBuilder";
import {
  COMMAND_NOTICE,
  COMMAND_TOPIC,
  COMMAND_BYE,
} from "../../app/utils/consts/commands";
import { LINKS_MESSAGE } from "../../app/utils/consts/templates";

export class CommandHandler {
  constructor(
    private newsService: NewsService,
    private lineClient: LineClient
  ) {}

  async handleCommand(
    command: string,
    replyToken: string,
    event: any
  ): Promise<void> {
    switch (command) {
      case COMMAND_NOTICE:
        await this.handleNoticeCommand(replyToken);
        break;
      case COMMAND_TOPIC:
        await this.handleTopicCommand(replyToken);
        break;
      case COMMAND_BYE:
        await this.handleByeCommand(event);
        break;
      case "@링크":
        await this.handleLinksCommand(replyToken);
        break;
      default:
        await this.handleUnknownCommand(replyToken);
    }
  }

  private async handleNoticeCommand(replyToken: string): Promise<void> {
    const notices = await this.newsService.getLatestNews("notice");
    const message =
      notices.length > 0
        ? MessageBuilder.createNewsFlexMessage(notices[0])
        : MessageBuilder.createTextMessage("최신 공지사항이 없습니다.");
    await this.lineClient.replyMessage(replyToken, [message]);
  }

  private async handleTopicCommand(replyToken: string): Promise<void> {
    const topics = await this.newsService.getLatestNews("topic");
    const message =
      topics.length > 0
        ? MessageBuilder.createNewsFlexMessage(topics[0])
        : MessageBuilder.createTextMessage("최신 토픽이 없습니다.");
    await this.lineClient.replyMessage(replyToken, [message]);
  }

  private async handleByeCommand(event: any): Promise<void> {
    if (event.source.type === "group") {
      await this.lineClient.leaveGroup(event.source.groupId);
    }
  }

  private async handleLinksCommand(replyToken: string): Promise<void> {
    const message = MessageBuilder.createTextMessage(LINKS_MESSAGE);
    await this.lineClient.replyMessage(replyToken, [message]);
  }

  private async handleUnknownCommand(replyToken: string): Promise<void> {
    const message =
      MessageBuilder.createTextMessage("알 수 없는 명령어입니다.");
    await this.lineClient.replyMessage(replyToken, [message]);
  }
}
