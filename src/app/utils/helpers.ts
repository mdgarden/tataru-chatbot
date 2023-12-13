import { HELP_ME_YOSHIDA } from "./consts/commands";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

/**
 * 요시다 가챠
 * @returns 랜덤 요시다
 */
export const pickRandomYOSHIDA = () => {
  return HELP_ME_YOSHIDA[getRandomInt(HELP_ME_YOSHIDA.length)];
};

/**
 * 200자를 초과하는 텍스트를 말줄임표로 변환
 * @param text
 */
export const addEllipsis = (text: string) => {
  return text.length > 200 ? text.substring(0, 199) + "..." : text;
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

// TODO : 인게임 시간 획득
export const getEorzeaTime = () => {};
