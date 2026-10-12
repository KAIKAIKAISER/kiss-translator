import {
  getMaxTranBoxContentWidth,
  getMaxTranBoxContentHeight,
  getMaxTranBoxX,
  getMaxTranBoxY,
  getTranBoxOuterWidth,
  getTranBoxOuterHeight,
  getTranBoxViewportHeight,
  getAdaptiveTranBoxSize,
} from "./tranboxPosition";

// These values pin TRANBOX_CHROME_HEIGHT. The redesign increased the header
// from 36px to 56px and added a 1px card border, requiring 22px more outer height.
describe("translation box viewport bounds", () => {
  let originalInnerWidth;
  let originalInnerHeight;
  let clientWidth;
  let clientHeight;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    window.innerWidth = 800;
    window.innerHeight = 500;
    clientWidth = jest
      .spyOn(document.documentElement, "clientWidth", "get")
      .mockReturnValue(0);
    clientHeight = jest
      .spyOn(document.documentElement, "clientHeight", "get")
      .mockReturnValue(0);
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.innerHeight = originalInnerHeight;
    jest.restoreAllMocks();
  });

  test("keeps every outer edge within the document client area", () => {
    window.innerWidth = 1266;
    window.innerHeight = 806;
    clientWidth.mockReturnValue(1251);
    clientHeight.mockReturnValue(791);

    expect(getMaxTranBoxContentWidth() + getTranBoxOuterWidth(0)).toBe(1251);
    expect(getMaxTranBoxContentHeight() + getTranBoxOuterHeight(0)).toBe(791);
    expect(getMaxTranBoxX(400) + getTranBoxOuterWidth(400)).toBe(1251);
    expect(getMaxTranBoxY(200) + getTranBoxOuterHeight(200)).toBe(791);
    expect(getTranBoxViewportHeight()).toBe(791);
  });

  test("uses the full viewport when scrollbars take no space", () => {
    clientWidth.mockReturnValue(800);
    clientHeight.mockReturnValue(500);

    expect(getMaxTranBoxContentWidth()).toBe(784);
    expect(getMaxTranBoxContentHeight()).toBe(426);
    expect(getMaxTranBoxX(400)).toBe(384);
    expect(getMaxTranBoxY(200)).toBe(226);
  });

  test.each([0, undefined])(
    "falls back per axis when the client measurement is %s",
    (measurement) => {
      clientWidth.mockReturnValue(measurement);
      clientHeight.mockReturnValue(485);
      expect(getMaxTranBoxContentWidth()).toBe(784);
      expect(getMaxTranBoxY(200)).toBe(211);

      clientWidth.mockReturnValue(785);
      clientHeight.mockReturnValue(measurement);
      expect(getMaxTranBoxX(400)).toBe(369);
      expect(getMaxTranBoxContentHeight()).toBe(426);
      expect(getTranBoxViewportHeight()).toBe(500);
    }
  );

  test("falls back when no document root is available", () => {
    jest.spyOn(document, "documentElement", "get").mockReturnValue(null);

    expect(getMaxTranBoxContentWidth()).toBe(784);
    expect(getMaxTranBoxContentHeight()).toBe(426);
  });

  test("uses the body client area for a quirks-mode document", () => {
    jest.spyOn(document, "compatMode", "get").mockReturnValue("BackCompat");
    jest.spyOn(document.body, "clientWidth", "get").mockReturnValue(785);
    jest.spyOn(document.body, "clientHeight", "get").mockReturnValue(485);
    clientWidth.mockReturnValue(785);
    clientHeight.mockReturnValue(2200);

    expect(getMaxTranBoxX(400)).toBe(369);
    expect(getMaxTranBoxY(200)).toBe(211);
  });

  test("reads current client bounds after a viewport change", () => {
    clientWidth.mockReturnValue(785);
    clientHeight.mockReturnValue(485);
    expect(getMaxTranBoxX(400)).toBe(369);
    expect(getMaxTranBoxY(200)).toBe(211);

    clientWidth.mockReturnValue(1000);
    clientHeight.mockReturnValue(700);
    expect(getMaxTranBoxX(400)).toBe(584);
    expect(getMaxTranBoxY(200)).toBe(426);
  });

  test("never returns negative limits for a narrow client area", () => {
    clientWidth.mockReturnValue(10);
    clientHeight.mockReturnValue(50);

    expect(getMaxTranBoxContentWidth()).toBe(0);
    expect(getMaxTranBoxContentHeight()).toBe(0);
    expect(getMaxTranBoxX(400)).toBe(0);
    expect(getMaxTranBoxY(200)).toBe(0);
  });

  test("includes the 56px header, resize grips, and card border", () => {
    expect(getTranBoxOuterHeight(200)).toBe(274);
    expect(getMaxTranBoxContentHeight()).toBe(426);
    expect(getMaxTranBoxY(200)).toBe(226);
  });

  test("never returns negative height or position limits", () => {
    window.innerHeight = 50;

    expect(getMaxTranBoxContentHeight()).toBe(0);
    expect(getMaxTranBoxY(200)).toBe(0);
  });

  describe("getAdaptiveTranBoxSize", () => {
    test("returns compact dimensions for short words and empty text", () => {
      const emptySize = getAdaptiveTranBoxSize("");
      expect(emptySize.w).toBe(320);
      expect(emptySize.h).toBe(180);

      const wordSize = getAdaptiveTranBoxSize("apple");
      expect(wordSize.w).toBe(300);
      expect(wordSize.h).toBe(212);
    });

    test("dynamically scales width and height for sentence text", () => {
      const sentence = "This is a quick demonstration sentence.";
      const size = getAdaptiveTranBoxSize(sentence);
      expect(size.w).toBe(354);
      expect(size.h).toBe(212);
    });

    test("dynamically expands height and width for multi-paragraph long text", () => {
      const longText =
        "Artificial intelligence and machine learning technologies have grown tremendously over recent years.\n\n" +
        "They now power intelligent translations across multilingual documents and platforms globally.";
      const size = getAdaptiveTranBoxSize(longText);
      expect(size.w).toBeGreaterThanOrEqual(400);
      expect(size.h).toBeGreaterThanOrEqual(280);
    });

    test("caps maximum width in simpleStyle mode", () => {
      const veryLongText = "A".repeat(500);
      const size = getAdaptiveTranBoxSize(veryLongText, { simpleStyle: true });
      expect(size.w).toBeLessThanOrEqual(480);
      expect(size.h).toBeLessThanOrEqual(600);
    });
  });
});
