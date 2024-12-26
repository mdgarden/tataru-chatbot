import * as line from "@line/bot-sdk";

import { COMMAND_BYE } from "@/app/utils/consts/commands";
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
    const { events } = await req.json();

    if (!events.length) {
      return Response.json({ success: true });
    }

    if (events[0].message.text === COMMAND_BYE) {
      await client.leaveGroup(events[0].source.groupId);
      return Response.json({ success: true });
    }

    const newMessage = await handleTextEvent(events[0].message.text);

    if (newMessage) {
      await client.replyMessage({
        replyToken: events[0].replyToken,
        messages: [newMessage],
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
