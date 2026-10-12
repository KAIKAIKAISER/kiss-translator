// Combined width of the left and right resize grips (8px on each side).
// DraggableResizable uses lineWidth = 4, with lineWidth * 2 on each grid side.
const TRANBOX_SIDE_GRIP_WIDTH = 16;
// Non-content height: 56px header + two 8px resize grips + two 1px card borders.
// Keep this aligned with .kt-tranbox-header and .KT-draggable-body in
// Selection/styles.js, plus the outer grid rows in DraggableResizable.
// Omitting the taller M3 header and borders lets the box overflow by 22px.
const TRANBOX_CHROME_HEIGHT = 74;

// The document client area excludes classic scrollbars. Use the current window's
// document so embedded frames keep their own bounds; unmeasured roots (including
// test environments) fall back to the window dimensions.
function getTranBoxViewportElement() {
  const doc = window.document;
  // In quirks mode, the body exposes the viewport while the root can grow with
  // the page content and therefore cannot provide a safe vertical bound.
  return doc?.compatMode === "BackCompat"
    ? doc.body || doc.documentElement
    : doc?.documentElement;
}

function getTranBoxViewportWidth() {
  const clientWidth = getTranBoxViewportElement()?.clientWidth;
  return clientWidth > 0 ? clientWidth : window.innerWidth;
}

export function getTranBoxViewportHeight() {
  const clientHeight = getTranBoxViewportElement()?.clientHeight;
  return clientHeight > 0 ? clientHeight : window.innerHeight;
}

/**
 * Get the outer translation box width, including the resize grips.
 */
export function getTranBoxOuterWidth(contentWidth) {
  return contentWidth + TRANBOX_SIDE_GRIP_WIDTH;
}

/**
 * Get the outer translation box height, including the header and resize grips.
 */
export function getTranBoxOuterHeight(contentHeight) {
  return contentHeight + TRANBOX_CHROME_HEIGHT;
}

/**
 * Get the maximum content width that keeps the outer box inside the viewport.
 */
export function getMaxTranBoxContentWidth() {
  return Math.max(0, getTranBoxViewportWidth() - TRANBOX_SIDE_GRIP_WIDTH);
}

/**
 * Get the maximum content height that keeps the outer box inside the viewport.
 */
export function getMaxTranBoxContentHeight() {
  return Math.max(0, getTranBoxViewportHeight() - TRANBOX_CHROME_HEIGHT);
}

/**
 * Get the maximum X position that keeps the right resize grip visible.
 */
export function getMaxTranBoxX(contentWidth) {
  return Math.max(
    0,
    getTranBoxViewportWidth() - getTranBoxOuterWidth(contentWidth)
  );
}

/**
 * Get the maximum Y position that keeps the bottom resize grip visible.
 */
export function getMaxTranBoxY(contentHeight) {
  return Math.max(
    0,
    getTranBoxViewportHeight() - getTranBoxOuterHeight(contentHeight)
  );
}

/**
 * 根据待翻译文本长短计算自适应的翻译框内容尺寸 { w, h }
 * - 文本短（如单字、单词、短语，<= 24 字符）：紧凑窗口（360px 宽，240px 预估最大高），配合 autoHeight 紧密贴合内容
 * - 文本中短（单句，25 ~ 70 字符）：适中窗口（420px 宽，280px 预估最大高）
 * - 文本中等（2-3 句，71 ~ 160 字符）：中等窗口（480px 宽，350px 预估最大高）
 * - 文本较长（单段，161 ~ 320 字符）：宽窗口（560px 宽，430px 预估最大高）
 * - 文本很长（多段，> 320 字符）：大窗口（640px 宽，510px 预估最大高）
 * @param {string} text 待翻译文本
 * @param {Object} [options]
 * @param {boolean} [options.simpleStyle] 是否极简风格
 * @returns {{ w: number, h: number }}
 */
export function getAdaptiveTranBoxSize(text = "", options = {}) {
  const rawText = typeof text === "string" ? text.trim() : "";
  const { simpleStyle = false } = options;

  let effectiveLen = 0;
  for (let i = 0; i < rawText.length; i++) {
    const code = rawText.charCodeAt(i);
    if (code === 10) {
      effectiveLen += 15;
    } else if (code > 255) {
      effectiveLen += 2;
    } else {
      effectiveLen += 1;
    }
  }

  let w = 360;
  let h = 240;

  if (effectiveLen <= 24) {
    w = 360;
    h = 240;
  } else if (effectiveLen <= 70) {
    w = 420;
    h = 280;
  } else if (effectiveLen <= 160) {
    w = 480;
    h = 350;
  } else if (effectiveLen <= 320) {
    w = 560;
    h = 430;
  } else {
    w = 640;
    h = 510;
  }

  if (simpleStyle) {
    w = Math.min(w, 480);
    h = Math.min(h, 400);
  }

  const maxW = getMaxTranBoxContentWidth();
  const maxH = getMaxTranBoxContentHeight();

  return {
    w: Math.max(320, Math.min(w, maxW)),
    h: Math.max(180, Math.min(h, maxH)),
  };
}
