import { HELP_ME_OMEGA, HELP_ME_YOSHIDA } from "./consts";
import { getRandomInt } from "./helpers";
import { FLEX_NOTICE_TEMPLATE, TEXT_TEMPLATE } from "./templates";

const pickRandomYOSHIDA = () => {
  return HELP_ME_YOSHIDA[getRandomInt(HELP_ME_YOSHIDA.length)];
};

export const generateQuickReply = (command: string) => {
  return command.includes(HELP_ME_OMEGA)
    ? generateTextMessage(HELP_ME_OMEGA)
    : generateTextMessage(pickRandomYOSHIDA());
};

export const generateTextMessage = (message: string) => {
  return { ...TEXT_TEMPLATE, text: message };
};

export const generateFlexMessage = (message: string) => {
  // getNewNotice()
  return { ...FLEX_NOTICE_TEMPLATE, text: message };
};
