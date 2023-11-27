import * as line from "@line/bot-sdk";

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const channelSecret = process.env.LINE_CHANNEL_SECRET!;

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken,
});

export async function POST(req: Request) {
  const body = await req.json();
  const reply = client.replyMessage({
    replyToken: body.events[0].replyToken,
    messages: [{ type: "text", text: body.events[0].message.text }],
  });

  return Response.json(reply);
}
