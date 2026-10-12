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
 * - 单词/短词组 (<= 30 字符)：精致小卡片 (320px 宽，180px 预估高)
 * - 短句 (31 ~ 90 字符)：轻量窗口 (360px 宽，220px 预估高)
 * - 1~2 句话 (91 ~ 220 字符)：适中紧凑窗口 (400px 宽，270px 预估高)
 * - 中小段落 (221 ~ 450 字符)：中等窗口 (440px 宽，320px 预估高)
 * - 完整段落 (451 ~ 800 字符)：阅读窗口 (480px 宽，380px 预估高)
 * - 长文本 (> 800 字符)：上限封顶窗口 (520px 宽，440px 预估高，配合滚动条阅读)
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

  let w = 320;
  let h = 180;

  if (effectiveLen <= 30) {
    w = 320;
    h = 180;
  } else if (effectiveLen <= 90) {
    w = 360;
    h = 220;
  } else if (effectiveLen <= 220) {
    w = 400;
    h = 270;
  } else if (effectiveLen <= 450) {
    w = 440;
    h = 320;
  } else if (effectiveLen <= 800) {
    w = 480;
    h = 380;
  } else {
    w = 520;
    h = 440;
  }

  if (simpleStyle) {
    if (effectiveLen <= 30) {
      w = 280;
      h = 140;
    } else if (effectiveLen <= 90) {
      w = 320;
      h = 170;
    } else if (effectiveLen <= 220) {
      w = 350;
      h = 210;
    } else if (effectiveLen <= 450) {
      w = 390;
      h = 260;
    } else {
      w = 430;
      h = 320;
    }
  }

  const maxW = getMaxTranBoxContentWidth();
  const maxH = getMaxTranBoxContentHeight();

  const minW = simpleStyle ? 260 : 300;
  const minH = simpleStyle ? 120 : 160;

  return {
    w: Math.max(minW, Math.min(w, maxW)),
    h: Math.max(minH, Math.min(h, maxH)),
  };
}
