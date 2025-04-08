import {
  FlexMessage,
  TextMessage,
  FlexBubble,
  FlexBox,
  FlexImage,
  FlexText,
  URIAction,
} from "@line/bot-sdk";
import {
  NEWS_BANNER_IMG,
  NOTICE_BUBBLE_STYLE,
  NOTICE_HEADER_STYLE,
  NOTICE_HERO_STYLE,
  NOTICE_BODY_STYLE,
  NOTICE_FOOTER_STYLE,
} from "../../app/utils/consts/templates";
import { News } from "../../core/domain/models/News";
import * as line from "@line/bot-sdk";

export class MessageBuilder {
  static createTextMessage(text: string): TextMessage {
    return {
      type: "text",
      text,
    };
  }

  static createNewsFlexMessage(news: News): FlexMessage {
    const header: FlexBox = {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: news.title,
          color: "#eeeeee",
          wrap: true,
          size: "md",
          align: "start",
          weight: "bold",
        } as FlexText,
        {
          type: "text",
          text: news.date.toLocaleDateString("ja-JP"),
          align: "end",
          size: "xs",
          margin: "md",
          color: "#eeeeee",
        } as FlexText,
      ],
      paddingAll: "xxl",
      paddingBottom: "md",
      paddingStart: "xl",
      paddingEnd: "xl",
    };

    const hero: FlexImage = {
      type: "image",
      url: news.imageUrl || NEWS_BANNER_IMG,
      aspectRatio: "4:1",
      aspectMode: "cover",
      size: "full",
    };

    const body: FlexBox = {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: news.content,
          wrap: true,
          size: "sm",
        } as FlexText,
      ],
      paddingAll: "xxl",
    };

    const footer: FlexBox = {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          action: {
            type: "uri",
            label: "더보기",
            uri: news.sourceUrl,
          },
        },
      ],
    };

    const bubble: FlexBubble = {
      type: "bubble",
      size: "mega",
      header,
      hero,
      body,
      footer,
      styles: {
        header: {
          backgroundColor: "#333333",
        },
      },
    };

    return {
      type: "flex",
      altText: news.title,
      contents: bubble,
    };
  }
}
