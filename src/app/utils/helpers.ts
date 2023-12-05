import { HELP_ME_YOSHIDA } from "./consts/commands";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const pickRandomYOSHIDA = () => {
  return HELP_ME_YOSHIDA[getRandomInt(HELP_ME_YOSHIDA.length)];
};

/**
 * LODESTONE내 시간을 YY/MM/DD 형식으로 변환
 * @param unixMs
 */
export const getLodestoneTime = (unixMs: string): string => {
  const date = new Date(Number(unixMs) * 1000);
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${yy}/${mm}/${dd}`;
};

export const getEorzeaTime = () => {};
