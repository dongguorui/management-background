const TOTAL_WIDTH = 1440; //页面总宽
const MENU_WIDTH = 48; //左侧菜单栏收起的宽度
const SAFETY_SPACE = 16; //安全边距
const BLANK_SPACE = 16; //留白
const GAP = 16; //水槽宽
const CONTENT =
  (TOTAL_WIDTH - MENU_WIDTH - 2 * SAFETY_SPACE - 2 * BLANK_SPACE - 23 * GAP) /
  24;

const grid = [];
for (let i = 1; i < 25; i++) {
  grid[i] = i * CONTENT + (i - 1) * GAP;
}

export {
  TOTAL_WIDTH,
  MENU_WIDTH,
  SAFETY_SPACE,
  BLANK_SPACE,
  GAP,
  CONTENT,
  grid,
};
