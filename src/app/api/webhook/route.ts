import * as line from "@line/bot-sdk";

import { COMMAND_BYE } from "@/app/utils/consts/commands";
import { handleTextEvent } from "@/app/utils/messageGenerators";
import { NextResponse } from "next/server";

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

    if (events[0]?.message?.type === "text") {
      const { message, source, replyToken } = events[0];

      if (message.text === COMMAND_BYE) {
        await client.leaveGroup(source.groupId);
      }

      const newMessage = await handleTextEvent(message.text);

      if (newMessage) {
        await client.replyMessage({ replyToken, messages: [newMessage] });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
