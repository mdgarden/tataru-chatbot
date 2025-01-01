import { FlexBubble, FlexMessage, TextMessage } from "../types";

export const NEWS_BANNER_IMG =
  "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FIfzcW%2FbtsBMTD7RCs%2FywJJY7RpoKb1acdgNJNiLK%2Fimg.png";

export const LINKS_MESSAGE = `글섭 공홈 : https://jp.finalfantasyxiv.com/lodestone/
한섭 공홈 : https://www.ff14.co.kr/main
지름신 : https://store.jp.square-enix.com/item_list.html?sale_cd=1#SERIES=11&pointercat=SERIES
G17 지도: https://game8.jp/ff14/624980
`;
export const TEXT_TEMPLATE: TextMessage = { type: "text", text: "" };

export const FLEX_TEMPLATE: FlexMessage = {
  type: "flex",
  altText: "",
  contents: { type: "", contents: [] },
};

export const NOTICE_HEADER_STYLE = {
  type: "box",
  layout: "vertical",
  contents: [
    {
      type: "text",
      text: "", // 공지 제목
      color: "#eeeeee",
      wrap: true,
      scaling: false,
      size: "md",
      align: "start",
      weight: "bold",
    },
    {
      type: "text",
      text: "", // 공지 날짜 yy/mm/dd
      align: "end",
      size: "xs",
      margin: "md",
      color: "#eeeeee",
    },
  ],
  paddingAll: "xxl",
  paddingBottom: "md",
  paddingStart: "xl",
  paddingEnd: "xl",
};

export const NOTICE_HERO_STYLE = {
  type: "image",
  url: "", // 공지 사진
  aspectRatio: "4:1",
  aspectMode: "cover",
  size: "full",
};

export const NOTICE_BODY_STYLE = {
  type: "box",
  layout: "vertical",
  contents: [
    {
      type: "text",
      text: "", // 본문
      wrap: true,
      size: "sm",
    },
  ],
  paddingAll: "xxl",
};

export const NOTICE_FOOTER_STYLE = {
  type: "box",
  layout: "vertical",
  contents: [
    {
      type: "button",
      action: {
        type: "uri",
        label: "더보기",
        uri: "", // 원문 링크
      },
    },
  ],
};

export const NOTICE_BUBBLE_STYLE: FlexBubble = {
  type: "bubble",
  size: "hecto",
  styles: {
    header: {
      backgroundColor: "#333333",
    },
  },
};
