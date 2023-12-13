import * as line from "@line/bot-sdk";

export type ReplyMessage = line.messagingApi.Message | undefined;
export type TextMessage = line.messagingApi.TextMessage;
export type FlexMessage = line.messagingApi.FlexMessage;
export type FlexBubble = line.messagingApi.FlexBubble;
export type FlexBox = line.messagingApi.FlexBox;

export type Notice = {
  title: string;
  date: string;
  imgUrl?: string;
  text?: string;
  postUrl: string;
};
