import {
  COMMAND_LINKS,
  COMMAND_NOTCE,
  COMMAND_QUICK_REPLY,
  COMMAND_SEARCH,
  HELP_ME_OMEGA,
} from "./consts/commands";
import { pickRandomYOSHIDA } from "./helpers";
import {
  FLEX_TEMPLATE,
  LINKS_MESSAGE,
  NOICE_HERO_STYLE,
  NOTICE_BODY_STYLE,
  NOTICE_BUBBLE_STYLE,
  NOTICE_FOOTER_STYLE,
  NOTICE_HEADER_STYLE,
  TEXT_TEMPLATE,
} from "./consts/templates";

const generateQuickReply = (command: string) => {
  return command.includes(HELP_ME_OMEGA)
    ? { ...TEXT_TEMPLATE, text: HELP_ME_OMEGA }
    : { ...TEXT_TEMPLATE, text: pickRandomYOSHIDA() };
};

const generateFlexMessage = (message: string) => {
  return { ...FLEX_TEMPLATE, text: message };
};

const convertToBubble = (
  title: string,
  date: string,
  text: string,
  imgUrl: string,
  postUrl: string
) => {
  const body = { ...NOTICE_BODY_STYLE };
  const hero = { ...NOICE_HERO_STYLE };
  const header = { ...NOTICE_HEADER_STYLE };
  const footer = { ...NOTICE_FOOTER_STYLE };

  header.contents[0].text = title;
  header.contents[1].text = date;
  hero.contents[0].url = imgUrl;
  body.contents[0].text = text;
  footer.contents[0].action.uri = postUrl;

  return { ...NOTICE_BUBBLE_STYLE, header, hero, body, footer };
};

export const generateNoticeCarousel = () => {
  const parsedProps = [
    {
      title: "adf",
      date: "11/22/12",
      imgUrl: "sdf.com",
      text: "asdf",
      postUrl: "asdf.com",
    },
  ];
  return {
    ...FLEX_TEMPLATE,
    ...{ altText: "notice" },
    ...{
      contents: {
        type: "carousel",
        contents: parsedProps.map((prop) => convertToBubble),
      },
    },
  };
};

export const generateMessage = (command: string) => {
  // TODO: 느낌표, 골뱅이 제외 특수문자 패스:  !!! 나 !?! 를 회피하기 위함

  const isQuickReply = !!COMMAND_QUICK_REPLY.find((word) =>
    command.includes(word)
  );

  if (command.startsWith(COMMAND_SEARCH)) return { type: "flex", text: "검색" }; // searchItem(command)
  if (command === COMMAND_NOTCE) return generateFlexMessage(command);
  if (command === COMMAND_LINKS)
    return { ...TEXT_TEMPLATE, text: LINKS_MESSAGE };
  if (isQuickReply) return generateQuickReply(command);
};
