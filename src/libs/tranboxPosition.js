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
 * 检测待翻译文本的体量（字符数、语言、段落结构），动态计算最匹配的翻译框尺寸 { w, h }
 * - 宽度：从单词卡片（280px）随着文本长度平滑扩展至舒适阅读面（520px~560px）
 * - 高度：根据文本分段、排版折行行数、原文+译文所需像素精准估算，在视口安全范围内自然撑开
 * - 短文本紧致无多余留白，长文本自动长高舒展呈现，杜绝内层截断挤压与多重滚动条
 * @param {string} text 待翻译文本
 * @param {Object} [options]
 * @param {boolean} [options.simpleStyle] 是否极简风格
 * @returns {{ w: number, h: number }}
 */
export function getAdaptiveTranBoxSize(text = "", options = {}) {
  const rawText = typeof text === "string" ? text.trim() : "";
  const { simpleStyle = false } = options;

  if (!rawText) {
    return {
      w: simpleStyle ? 280 : 320,
      h: simpleStyle ? 120 : 180,
    };
  }

  // 分析文本特征：字符数、段落数、中西文比例
  const paragraphs = rawText.split(/\r?\n/).filter(Boolean);
  const paragraphCount = Math.max(1, paragraphs.length);
  const totalLength = rawText.length;

  let cjkCount = 0;
  for (let i = 0; i < totalLength; i++) {
    if (rawText.charCodeAt(i) > 255) cjkCount++;
  }
  const isMainlyCjk = cjkCount / totalLength > 0.4;

  // 1. 动态宽度计算：根据文本实际体量平滑扩展，而非生硬阶梯跳变
  let w;
  if (totalLength <= 20 && paragraphCount === 1) {
    w = 300;
  } else if (totalLength <= 60) {
    w = 330 + Math.round((totalLength - 20) * 1.25);
  } else if (totalLength <= 180) {
    w = 380 + Math.round((totalLength - 60) * 0.42);
  } else if (totalLength <= 450) {
    w = 430 + Math.round((totalLength - 180) * 0.3);
  } else {
    w = 510 + Math.min(50, Math.round((totalLength - 450) * 0.08));
  }

  if (simpleStyle) {
    w = Math.max(260, Math.round(w * 0.88));
  }

  // 2. 动态高度计算：基于物理折行行数与控件像素精细测量
  const paddingW = simpleStyle ? 24 : 44;
  const contentW = Math.max(200, w - paddingW);
  const charsPerLine = isMainlyCjk
    ? Math.max(12, Math.floor(contentW / 14))
    : Math.max(25, Math.floor(contentW / 7.6));

  // 计算原文所占物理行数
  let sourceLines = 0;
  for (const p of (paragraphs.length ? paragraphs : [rawText])) {
    sourceLines += Math.max(1, Math.ceil(p.length / charsPerLine));
  }

  // 预估译文所占物理行数
  const targetLines = isMainlyCjk
    ? Math.max(1, Math.ceil(sourceLines * 1.15))
    : Math.max(1, Math.ceil(sourceLines * 0.85));

  const lineHeight = 21;
  const chromeHeader = 56;
  const controlsHeight = simpleStyle ? 8 : 68;
  const sourceBoxHeight = simpleStyle
    ? 0
    : Math.min(sourceLines * lineHeight + 36, 190);
  const targetBoxHeight = targetLines * lineHeight + 42;

  // 实际需要的内容高度
  const neededContentHeight =
    controlsHeight + sourceBoxHeight + targetBoxHeight + 24;

  // 结合当前视口安全边界（避免弹窗溢出屏幕底部）
  const viewportH = getTranBoxViewportHeight();
  const maxSafeContentH = Math.max(240, viewportH - chromeHeader - 60);

  const minH = simpleStyle ? 120 : 160;
  const h = Math.max(minH, Math.min(neededContentHeight, maxSafeContentH));

  const maxW = getMaxTranBoxContentWidth();
  const maxH = getMaxTranBoxContentHeight();

  return {
    w: Math.max(simpleStyle ? 260 : 280, Math.min(w, maxW)),
    h: Math.max(minH, Math.min(h, maxH)),
  };
}
