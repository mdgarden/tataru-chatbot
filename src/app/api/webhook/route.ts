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
  try {
    const body = await req.json();

    if (!body.events.length) {
      return Response.json({});
    }

    if (body.events[0].message.text === COMMAND_BYE) {
      await client.leaveGroup(body.events[0].source.groupId);
      return Response.json({ success: true });
    }

    const message = await handleTextEvent(body.events[0].message.text);
    const replyToken = body.events[0].replyToken;

    if (!message) {
      return Response.json({});
    }

    await client.replyMessage({
      replyToken,
      messages: [message],
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
