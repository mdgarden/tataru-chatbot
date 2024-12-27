import { getGlobalNotices, getGlobalTopics } from "./scraper/lodestone";
import {
  COMMAND_LINKS,
  COMMAND_NAVI,
  COMMAND_NOTICE,
  COMMAND_QUICK_REPLY,
  COMMAND_TOPIC,
  HELP_ME_OMEGA,
} from "./consts/commands";
import { addEllipsis, pickRandomYOSHIDA } from "./helpers";
import {
  FLEX_TEMPLATE,
  LINKS_MESSAGE,
  NOTICE_HERO_STYLE,
  NOTICE_BODY_STYLE,
  NOTICE_BUBBLE_STYLE,
  NOTICE_FOOTER_STYLE,
  NOTICE_HEADER_STYLE,
  TEXT_TEMPLATE,
} from "./consts/templates";
import { FlexMessage, TextMessage, Notice } from "./types";

function generateQuickReply(command: string): TextMessage {
  return command.includes(HELP_ME_OMEGA)
    ? { ...TEXT_TEMPLATE, text: HELP_ME_OMEGA }
    : { ...TEXT_TEMPLATE, text: pickRandomYOSHIDA() };
}

function generateNaviReply(): TextMessage {
  return { ...TEXT_TEMPLATE, text: Math.random() < 0.5 ? "왼쪽" : "오른쪽" };
}

function convertToBubble({ title, date, text, imgUrl, postUrl }: Notice) {
  const hero = { ...NOTICE_HERO_STYLE };
  const body = { ...NOTICE_BODY_STYLE };
  const header = { ...NOTICE_HEADER_STYLE };
  const footer = { ...NOTICE_FOOTER_STYLE };

  header.contents[0].text = title;
  header.contents[1].text = date;
  hero.url = imgUrl!;
  body.contents[0].text = addEllipsis(text!);
  footer.contents[0].action.uri = postUrl;

  const bubble: Notice = JSON.parse(
    JSON.stringify({
      ...NOTICE_BUBBLE_STYLE,
      header,
      hero,
      body,
      footer,
    })
  );

  return bubble;
}

export function generateNewsCarousel(parsedProps: Notice[]): FlexMessage {
  const contents = parsedProps.map(convertToBubble);

  const carousel = {
    ...FLEX_TEMPLATE,
    ...{ altText: "news" },
    ...{
      contents: {
        type: "carousel",
        contents,
      },
    },
  };

  return carousel;
}

export async function handleTextEvent(
  command: string
): Promise<FlexMessage | TextMessage | null> {
  const isQuickReply = !!COMMAND_QUICK_REPLY.find((word) =>
    command.includes(word)
  );

  if (isQuickReply) {
    return generateQuickReply(command);
  }

  // TODO: 느낌표, 골뱅이 제외 특수문자 패스 처리 필요(!!! 혹은 ?!! 같은)
  switch (command) {
    case COMMAND_NOTICE: {
      const notices = await getGlobalNotices();
      return generateNewsCarousel(notices);
    }
    case COMMAND_TOPIC: {
      const topics = await getGlobalTopics();
      return generateNewsCarousel(topics);
    }
    case COMMAND_LINKS:
      return { ...TEXT_TEMPLATE, text: LINKS_MESSAGE };
    case COMMAND_NAVI:
      return generateNaviReply();
    default:
      return null;
  }
}
