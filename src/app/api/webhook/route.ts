import * as line from "@line/bot-sdk";

import { generateMessage } from "@/app/utils/messageGenerators";

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const channelSecret = process.env.LINE_CHANNEL_SECRET!;

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken,
});

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.events.length) return Response.json({});

  const replyToken = body.events[0].replyToken;
  const message = await generateMessage(body.events[0].message.text);

  return message
    ? Response.json(
        client.replyMessage({
          replyToken,
          messages: [message],
        })
      )
    : Response.json({});
}
