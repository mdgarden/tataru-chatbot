import { HELP_ME_YOSHIDA } from "./consts/commands";

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const pickRandomYOSHIDA = () => {
  return HELP_ME_YOSHIDA[getRandomInt(HELP_ME_YOSHIDA.length)];
};
