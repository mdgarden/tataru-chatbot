import * as line from "@line/bot-sdk";

import { COMMAND_BYE, COMMAND_NAVI } from "@/app/utils/consts/commands";
import { handleTextEvent } from "@/app/utils/messageGenerators";

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};
const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken,
});

export async function POST(req: Request) {
  const body = await req.json();

  // NOTE: 콘솔 웹훅 URL 검증용
  if (!body.events.length) {
    return Response.json([]);
  }

  if (body.events[0].message.text === COMMAND_BYE) {
    console.log(body.events[0].source.groupId);
    return client.leaveGroup(body.events[0].source.groupId);
  }

  const message = await handleTextEvent(body.events[0].message.text);
  const replyToken = body.events[0].replyToken;

  if (!message) {
    return;
  }

  return Response.json(
    client.replyMessage({
      replyToken,
      messages: [message],
    })
  );
}
