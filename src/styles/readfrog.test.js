import {
  READFROG_COLORS,
  resolveReadFrogColors,
  createReadFrogCssVariables,
  READFROG_FONT_FAMILY,
  getReadFrogSwitchStyleOverrides,
  createReadFrogThemeOptions,
} from "./readfrog";

describe("Read Frog theme tokens and utils", () => {
  test("resolves distinct light and dark palettes", () => {
    const light = resolveReadFrogColors("light");
    const dark = resolveReadFrogColors("dark");

    expect(light.background).toBe("#FFFFFF");
    expect(dark.background).toBe("#09090B");
    expect(light.primary).toBe(READFROG_COLORS.light.primary);
    expect(dark.primary).toBe(READFROG_COLORS.dark.primary);
    expect(light.rfBrand).toBe("#E5B800");
    expect(dark.rfBrand).toBe("#FACC15");
  });

  test("generates all required CSS variables with --kt and --rf prefixes", () => {
    const colors = resolveReadFrogColors("light");
    const vars = createReadFrogCssVariables(colors);

    expect(vars["--kt-pri"]).toBe(colors.primary);
    expect(vars["--kt-bg"]).toBe("#FFFFFF");
    expect(vars["--kt-sf0"]).toBe("#FFFFFF");
    expect(vars["--rf-brand"]).toBe("#E5B800");
    expect(vars["--rf-radius"]).toBe("10px");
    expect(vars["--rf-sidebar"]).toBe("#FAFAFA");
  });

  test("uses Inter as primary font family", () => {
    expect(READFROG_FONT_FAMILY).toContain("Inter");
  });

  test("generates sleek switch overrides with 44px track width", () => {
    const colors = resolveReadFrogColors("light");
    const switchStyles = getReadFrogSwitchStyleOverrides(colors);

    expect(switchStyles.root.width).toBe(44);
    expect(switchStyles.root.height).toBe(24);
    expect(switchStyles.switchBase["&.Mui-checked"].transform).toBe(
      "translateX(20px)"
    );
  });

  test("generates theme options with borderRadius 10", () => {
    const colors = resolveReadFrogColors("light");
    const options = createReadFrogThemeOptions(colors, "light", {});

    expect(options.shape.borderRadius).toBe(10);
    expect(options.palette.mode).toBe("light");
    expect(options.components.MuiButton.styleOverrides.root.borderRadius).toBe(
      8
    );
  });
});
