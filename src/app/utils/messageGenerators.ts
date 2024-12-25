import {
  COMMAND_LINKS,
  COMMAND_NOTICE,
  COMMAND_QUICK_REPLY,
  COMMAND_SEARCH,
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
import { getGlobalNotices, getGlobalTopics } from "./scraper/lodestone";
import { FlexMessage, Notice } from "./types";

function generateQuickReply(command: string) {
  return command.includes(HELP_ME_OMEGA)
    ? { ...TEXT_TEMPLATE, text: HELP_ME_OMEGA }
    : { ...TEXT_TEMPLATE, text: pickRandomYOSHIDA() };
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

export async function generateMessage(command: string) {
  const isQuickReply = !!COMMAND_QUICK_REPLY.find((word) =>
    command.includes(word)
  );

  // TODO: 느낌표, 골뱅이 제외 특수문자 패스:  !!! 나 !?! 를 회피하기 위함
  // if (command.startsWith(COMMAND_SEARCH)) return { type: "text", text: "검색" }; // searchItem(command)
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
    default:
      if (isQuickReply) return generateQuickReply(command);
      return;
  }
}
