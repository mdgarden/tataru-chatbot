import * as line from "@line/bot-sdk";

import {
  COMMAND_LINKS,
  COMMAND_NOTCE,
  COMMAND_SEARCH,
  COMMAND_QUICK_REPLY,
} from "@/app/utils/consts";
import { LINKS_TEMPLATE } from "@/app/utils/templates";
import {
  generateFlexMessage,
  generateQuickReply,
} from "@/app/utils/messageGenerators";

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
const channelSecret = process.env.LINE_CHANNEL_SECRET!;

type ReplyMessage = line.messagingApi.Message;

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken,
});

export async function POST(req: Request) {
  const body = await req.json();
  const command: string = body.events[0].message.text;
  const generateMessage = (command: string): ReplyMessage => {
    // TODO: 느낌표, 골뱅이 제외 특수문자 패스

    const isQuickReply = !!COMMAND_QUICK_REPLY.find((word) =>
      command.includes(word)
    );

    if (command.startsWith(COMMAND_SEARCH))
      return { type: "flex", text: "검색" }; // searchItem(command)
    if (command === COMMAND_NOTCE)
      return { type: "flex", text: generateFlexMessage(command) }; //getNewNotice()
    if (command === COMMAND_LINKS)
      return { type: "text", text: LINKS_TEMPLATE };
    if (isQuickReply) return generateQuickReply(command);

    return { type: "text", text: "" };
  };

  const reply = client.replyMessage({
    replyToken: body.events[0].replyToken,
    messages: [generateMessage(command)],
  });

  return Response.json(reply);
}
