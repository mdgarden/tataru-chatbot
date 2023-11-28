import {
  COMMAND_LINKS,
  COMMAND_NOTCE,
  COMMAND_QUICK_REPLY,
  COMMAND_SEARCH,
  HELP_ME_OMEGA,
  HELP_ME_YOSHIDA,
} from "./consts";
import { getRandomInt } from "./helpers";
import {
  FLEX_NOTICE_TEMPLATE,
  LINKS_MESSAGE,
  TEXT_TEMPLATE,
} from "./templates";
import { ReplyMessage } from "./types";

const pickRandomYOSHIDA = () => {
  return HELP_ME_YOSHIDA[getRandomInt(HELP_ME_YOSHIDA.length)];
};

const generateQuickReply = (command: string) => {
  return command.includes(HELP_ME_OMEGA)
    ? { ...TEXT_TEMPLATE, text: HELP_ME_OMEGA }
    : { ...TEXT_TEMPLATE, text: pickRandomYOSHIDA() };
};

const generateFlexMessage = (message: string) => {
  // getNewNotice()
  return { ...FLEX_NOTICE_TEMPLATE, text: message };
};

export const generateMessage = (command: string): ReplyMessage => {
  // TODO: 느낌표, 골뱅이 제외 특수문자 패스

  const isQuickReply = !!COMMAND_QUICK_REPLY.find((word) =>
    command.includes(word)
  );

  if (command.startsWith(COMMAND_SEARCH)) return { type: "flex", text: "검색" }; // searchItem(command)
  if (command === COMMAND_NOTCE) return generateFlexMessage(command);
  if (command === COMMAND_LINKS)
    return { ...TEXT_TEMPLATE, text: LINKS_MESSAGE };
  if (isQuickReply) return generateQuickReply(command);
};
