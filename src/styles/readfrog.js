export const READFROG_COLORS = {
  light: {
    primary: "#4F7BF6",
    onPrimary: "#FFFFFF",
    primaryContainer: "#EFF4FE",
    onPrimaryContainer: "#1D3B8A",
    secondaryContainer: "#F4F4F5",
    onSecondaryContainer: "#18181B",
    tertiaryContainer: "#FEF9C3",
    onTertiaryContainer: "#713F12",
    error: "#EF4444",
    errorContainer: "#FEE2E2",
    onErrorContainer: "#991B1B",
    success: "#10B981",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceLow: "#FAFAFA",
    surfaceContainer: "#F4F4F5",
    surfaceHigh: "#E4E4E7",
    surfaceHighest: "#D4D4D8",
    onSurface: "#09090B",
    onSurfaceVariant: "#71717A",
    outline: "#A1A1AA",
    outlineVariant: "#E4E4E7",
    inverseSurface: "#18181B",
    onInverseSurface: "#FAFAFA",
    // Read Frog semantic extras
    rfPrimary: "#18181B",
    rfOnPrimary: "#FAFAFA",
    rfBrand: "#E5B800",
    rfAccent: "#4F7BF6",
    rfSidebar: "#FAFAFA",
    rfSidebarBorder: "#E4E4E7",
  },
  dark: {
    primary: "#60A5FA",
    onPrimary: "#0B1E47",
    primaryContainer: "#1E3A8A",
    onPrimaryContainer: "#DBEAFE",
    secondaryContainer: "#27272A",
    onSecondaryContainer: "#FAFAFA",
    tertiaryContainer: "#422006",
    onTertiaryContainer: "#FEF08A",
    error: "#F87171",
    errorContainer: "#450A0A",
    onErrorContainer: "#FECACA",
    success: "#34D399",
    background: "#09090B",
    surface: "#18181B",
    surfaceLow: "#141416",
    surfaceContainer: "#27272A",
    surfaceHigh: "#3F3F46",
    surfaceHighest: "#52525B",
    onSurface: "#FAFAFA",
    onSurfaceVariant: "#A1A1AA",
    outline: "#71717A",
    outlineVariant: "#27272A",
    inverseSurface: "#FAFAFA",
    onInverseSurface: "#18181B",
    // Read Frog semantic extras
    rfPrimary: "#FAFAFA",
    rfOnPrimary: "#18181B",
    rfBrand: "#FACC15",
    rfAccent: "#60A5FA",
    rfSidebar: "#111113",
    rfSidebarBorder: "rgba(255, 255, 255, 0.08)",
  },
};

export function resolveReadFrogColors(mode = "light") {
  const normalized = mode === "dark" ? "dark" : "light";
  return { ...READFROG_COLORS[normalized] };
}

export function createReadFrogCssVariables(colors) {
  return {
    "--kt-pri": colors.primary,
    "--kt-onpri": colors.onPrimary,
    "--kt-pric": colors.primaryContainer,
    "--kt-onpric": colors.onPrimaryContainer,
    "--kt-secc": colors.secondaryContainer,
    "--kt-onsecc": colors.onSecondaryContainer,
    "--kt-terc": colors.tertiaryContainer,
    "--kt-onterc": colors.onTertiaryContainer,
    "--kt-grn": colors.success,
    "--kt-err": colors.error,
    "--kt-errc": colors.errorContainer,
    "--kt-onerrc": colors.onErrorContainer,
    "--kt-bg": colors.background,
    "--kt-sf0": colors.surface,
    "--kt-sf1": colors.surfaceLow,
    "--kt-sf2": colors.surfaceContainer,
    "--kt-sf3": colors.surfaceHigh,
    "--kt-sf4": colors.surfaceHighest,
    "--kt-on": colors.onSurface,
    "--kt-onv": colors.onSurfaceVariant,
    "--kt-line": colors.outline,
    "--kt-linev": colors.outlineVariant,
    "--kt-inv": colors.inverseSurface,
    "--kt-oninv": colors.onInverseSurface,
    "--rf-primary": colors.rfPrimary,
    "--rf-onprimary": colors.rfOnPrimary,
    "--rf-brand": colors.rfBrand,
    "--rf-accent": colors.rfAccent,
    "--rf-sidebar": colors.rfSidebar,
    "--rf-sidebar-border": colors.rfSidebarBorder,
    "--rf-radius": "10px",
  };
}

export const READFROG_FONT_FAMILY =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif';

export function getReadFrogSwitchStyleOverrides(color) {
  const isDark = color.background === "#09090B";
  const trackOffBg = isDark ? "#3F3F46" : "#E4E4E7";

  return {
    root: {
      width: 44,
      height: 24,
      padding: 0,
      overflow: "visible",
      "&.MuiSwitch-sizeSmall": {
        width: 36,
        height: 20,
        "& .MuiSwitch-switchBase.Mui-checked": {
          transform: "translateX(16px)",
        },
        "& .MuiSwitch-thumb": {
          width: 16,
          height: 16,
        },
      },
    },
    switchBase: {
      width: 24,
      height: 24,
      display: "grid",
      placeItems: "center",
      top: 0,
      left: 0,
      padding: 2,
      color: "#FFFFFF",
      transform: "none",
      transition: "transform .25s cubic-bezier(.4, 0, .2, 1), color .2s ease",
      "&:not(.Mui-disabled):hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focusVisible": {
        outline: `2px solid ${color.primary}`,
        outlineOffset: 2,
      },
      "&.Mui-checked": {
        padding: 2,
        transform: "translateX(20px)",
        color: "#FFFFFF",
        "& + .MuiSwitch-track": {
          borderColor: "transparent",
          backgroundColor: color.primary,
          opacity: 1,
        },
        "& .MuiSwitch-thumb": {
          width: 20,
          height: 20,
        },
        "& .MuiSwitch-input": {
          left: -20,
        },
      },
      "&.Mui-disabled": {
        color: "#FFFFFF",
        "& .MuiSwitch-thumb": { opacity: 0.6 },
        "& + .MuiSwitch-track": {
          backgroundColor: trackOffBg,
          opacity: 0.5,
        },
      },
    },
    input: {
      left: 0,
      width: 44,
      height: 24,
      borderRadius: 999,
    },
    thumb: {
      width: 20,
      height: 20,
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px -1px rgba(0, 0, 0, 0.2)",
      transition: "all .2s cubic-bezier(.4, 0, .2, 1)",
    },
    track: {
      border: "none",
      borderRadius: 999,
      backgroundColor: trackOffBg,
      opacity: 1,
      transition: "background-color .2s ease",
    },
  };
}

export function createReadFrogThemeOptions(colors, resolvedMode, focusRing) {
  return {
    palette: {
      mode: resolvedMode,
      primary: { main: colors.primary, contrastText: colors.onPrimary },
      secondary: {
        main: colors.secondaryContainer,
        contrastText: colors.onSecondaryContainer,
      },
      error: { main: colors.error },
      success: { main: colors.success },
      background: { default: colors.background, paper: colors.surface },
      text: {
        primary: colors.onSurface,
        secondary: colors.onSurfaceVariant,
      },
      divider: colors.outlineVariant,
    },
    shape: { borderRadius: 10 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { backgroundColor: colors.background },
          body: { backgroundColor: colors.background },
          "#root": { minHeight: "100%" },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderColor: colors.outlineVariant,
            colorScheme: resolvedMode,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            minHeight: 38,
            borderRadius: 8,
            paddingInline: 16,
            fontWeight: 550,
            letterSpacing: "-0.01em",
            textTransform: "none",
            transition:
              "background-color .2s, border-color .2s, color .2s, transform .15s, box-shadow .2s",
            "&:active": { transform: "scale(.98)" },
            "&.Mui-focusVisible": focusRing,
          },
          contained: {
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          },
          outlined: {
            borderColor: colors.outlineVariant,
            "&:hover": {
              borderColor: colors.outline,
              backgroundColor: colors.surfaceContainer,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            borderRadius: 8,
            ...(ownerState.color === "default" && {
              color: colors.onSurfaceVariant,
              "&:hover": {
                backgroundColor: colors.surfaceContainer,
                "@media (hover: none)": { backgroundColor: "transparent" },
              },
            }),
            transition: "background .2s, color .2s, transform .15s",
            "&:active": { transform: "scale(.94)" },
            "&.Mui-focusVisible": focusRing,
          }),
        },
      },
      MuiTextField: {
        defaultProps: { variant: "filled" },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: true },
        styleOverrides: {
          root: {
            minHeight: 44,
            overflow: "hidden",
            border: `1px solid ${colors.outlineVariant}`,
            borderRadius: 10,
            backgroundColor: colors.surfaceContainer,
            transition:
              "background-color .2s, border-color .2s, box-shadow .2s",
            "&:not(.Mui-disabled, .Mui-focused):hover": {
              backgroundColor: colors.surfaceHigh,
              borderColor: colors.outline,
            },
            "&.Mui-focused": {
              borderColor: colors.primary,
              backgroundColor: colors.surface,
              boxShadow: `0 0 0 3px color-mix(in srgb, ${colors.primary} 20%, transparent)`,
            },
            "&.Mui-error": {
              borderColor: colors.error,
            },
            "&.Mui-error.Mui-focused": {
              borderColor: colors.error,
              boxShadow: `0 0 0 3px color-mix(in srgb, ${colors.error} 20%, transparent)`,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
              borderWidth: 1,
              boxShadow: `0 0 0 3px color-mix(in srgb, ${colors.primary} 20%, transparent)`,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.MuiInputLabel-shrink": {
              backgroundColor: colors.surface,
              padding: "0 4px",
              borderRadius: 4,
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            "&:focus": {
              borderRadius: "inherit",
              backgroundColor: "transparent",
            },
          },
          icon: {
            transition: "transform .2s ease",
          },
        },
      },
      MuiSwitch: {
        styleOverrides: getReadFrogSwitchStyleOverrides(colors),
      },
      MuiSlider: {
        styleOverrides: {
          thumb: {
            "&.Mui-focusVisible": {
              outline: `2px solid ${colors.primary}`,
              outlineOffset: 2,
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              outline: `2px solid ${colors.primary}`,
              outlineOffset: 0,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 38,
            padding: 3,
            borderRadius: 10,
            backgroundColor: colors.surfaceContainer,
          },
          indicator: { display: "none" },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minWidth: 0,
            maxWidth: "100%",
            minHeight: 32,
            overflow: "hidden",
            borderRadius: 8,
            color: colors.onSurfaceVariant,
            fontWeight: 550,
            textOverflow: "ellipsis",
            textTransform: "none",
            transition: "all .18s ease",
            whiteSpace: "nowrap",
            "&.Mui-selected": {
              backgroundColor: colors.surface,
              color: colors.onSurface,
              fontWeight: 650,
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)",
            },
            "&&.Mui-focusVisible": {
              outline: "none",
              boxShadow: `inset 0 0 0 2px ${colors.primary}`,
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            margin: "2px 4px",
            color: colors.onSurface,
            fontWeight: 500,
            transition: "background-color .15s ease, color .15s ease",
            "&:hover": {
              backgroundColor: colors.surfaceContainer,
            },
            "&.Mui-selected": {
              backgroundColor: colors.primaryContainer,
              color: colors.primary,
              fontWeight: 600,
            },
            "&.Mui-selected:hover": {
              backgroundColor: colors.primaryContainer,
            },
            "&&.Mui-focusVisible": {
              outline: "none",
              backgroundColor: colors.surfaceHigh,
              boxShadow: `inset 0 0 0 2px ${colors.primary}`,
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: colors.onSurfaceVariant,
            fontWeight: 550,
            transition: "all .18s ease",
            "&:hover": {
              backgroundColor: colors.surfaceContainer,
            },
            "&.Mui-selected": {
              backgroundColor: colors.primaryContainer,
              color: colors.primary,
              fontWeight: 600,
            },
            "&.Mui-selected:hover": {
              backgroundColor: colors.primaryContainer,
            },
            "&&.Mui-focusVisible": {
              outline: "none",
              boxShadow: `inset 0 0 0 2px ${colors.primary}`,
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&&.Mui-focusVisible": {
              outline: "none",
              backgroundColor: colors.surfaceHigh,
              boxShadow: `inset 0 0 0 2px ${colors.primary}`,
            },
            "&&.Mui-selected.Mui-focusVisible": {
              backgroundColor: colors.primaryContainer,
              color: colors.primary,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${colors.outlineVariant}`,
            borderRadius: 12,
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
          },
        },
      },
      MuiAccordion: {
        defaultProps: { disableGutters: true },
        styleOverrides: {
          root: {
            overflow: "hidden",
            border: `1px solid ${colors.outlineVariant}`,
            borderRadius: "10px !important",
            boxShadow: "none",
            "&::before": { display: "none" },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            "&&.Mui-focusVisible": {
              outline: "none",
              backgroundColor: colors.surfaceHigh,
              boxShadow: `inset 0 0 0 2px ${colors.primary}`,
            },
          },
        },
      },
      MuiLoadingButton: {
        styleOverrides: {
          loadingIndicator: { color: colors.primary },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            border: `1px solid ${colors.outlineVariant}`,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 10,
            border: `1px solid ${colors.outlineVariant}`,
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 6,
            fontSize: 12,
            backgroundColor: colors.inverseSurface,
            color: colors.onInverseSurface,
          },
        },
      },
      MuiAlert: {
        styleOverrides: { root: { borderRadius: 10 } },
      },
      MuiSnackbarContent: {
        styleOverrides: { root: { borderRadius: 8 } },
      },
    },
  };
}

export const READFROG_GLOBAL_CSS = String.raw`
:host,
.kt-m3-root[data-theme-style="readfrog"],
.kt-readfrog-root {
  --kt-spring: cubic-bezier(.16, 1, .3, 1);
  --kt-shadow-1: 0 1px 3px 0 rgba(0, 0, 0, .08), 0 1px 2px -1px rgba(0, 0, 0, .08);
  --kt-shadow-2: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1);
  color: var(--kt-on);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Noto Sans SC", "Source Han Sans SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.kt-m3-root[data-theme-style="readfrog"][data-theme="dark"],
.kt-readfrog-root[data-theme="dark"] {
  --kt-shadow-1: 0 1px 3px 0 rgba(0, 0, 0, .4), 0 1px 2px -1px rgba(0, 0, 0, .4);
  --kt-shadow-2: 0 10px 20px -3px rgba(0, 0, 0, .5), 0 4px 6px -4px rgba(0, 0, 0, .4);
}

.kt-m3-root[data-theme-style="readfrog"] *,
.kt-readfrog-root * {
  box-sizing: border-box;
}

.kt-m3-root[data-theme-style="readfrog"] :focus-visible,
.kt-readfrog-root :focus-visible {
  outline: 2px solid var(--kt-pri);
  outline-offset: 2px;
}

/* Scrollbars */
.kt-m3-root[data-theme-style="readfrog"] ::-webkit-scrollbar,
.kt-readfrog-root ::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

.kt-m3-root[data-theme-style="readfrog"] ::-webkit-scrollbar-thumb,
.kt-readfrog-root ::-webkit-scrollbar-thumb {
  background: var(--kt-linev);
  border-radius: 999px;
}

.kt-m3-root[data-theme-style="readfrog"] ::-webkit-scrollbar-track,
.kt-readfrog-root ::-webkit-scrollbar-track {
  background: transparent;
}

/* Options page Read Frog refinements */
.kt-m3-root[data-theme-style="readfrog"] .kt-options-sidebar,
.kt-readfrog-root .kt-options-sidebar {
  background: var(--rf-sidebar, var(--kt-sf1));
  border-right: 1px solid var(--rf-sidebar-border, var(--kt-linev));
}

.kt-m3-root[data-theme-style="readfrog"] .kt-options-search,
.kt-readfrog-root .kt-options-search {
  border-radius: 10px;
  border: 1px solid var(--kt-linev);
  background: var(--kt-sf0);
  transition: border-color .15s ease, box-shadow .15s ease;
}

.kt-m3-root[data-theme-style="readfrog"] .kt-options-search:focus-within,
.kt-readfrog-root .kt-options-search:focus-within {
  outline: none;
  border-color: var(--kt-pri);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--kt-pri) 20%, transparent);
}

.kt-m3-root[data-theme-style="readfrog"] .kt-options-nav__link,
.kt-readfrog-root .kt-options-nav__link {
  border-radius: 8px;
  min-height: 40px;
  font-weight: 500;
  transition: all .15s ease;
}

.kt-m3-root[data-theme-style="readfrog"] .kt-options-nav__link.active,
.kt-readfrog-root .kt-options-nav__link.active {
  background: var(--kt-pric);
  color: var(--kt-pri);
  font-weight: 600;
}

.kt-m3-root[data-theme-style="readfrog"] .kt-settings-card,
.kt-readfrog-root .kt-settings-card {
  border-radius: 12px;
  border: 1px solid var(--kt-linev);
  background: var(--kt-sf0);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .05);
}

.kt-m3-root[data-theme-style="readfrog"] .kt-settings-segmented,
.kt-readfrog-root .kt-settings-segmented {
  border-radius: 8px;
  background: var(--kt-sf2);
  padding: 3px;
}

.kt-m3-root[data-theme-style="readfrog"] .kt-settings-segmented > button.kt-settings-segmented__button--selected,
.kt-readfrog-root .kt-settings-segmented > button.kt-settings-segmented__button--selected {
  border-radius: 6px;
  background: var(--kt-sf0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .08);
  font-weight: 600;
  color: var(--kt-on);
}

/* Popup page Read Frog refinements */
.kt-m3-root[data-theme-style="readfrog"] .kt-popup-shell,
.kt-readfrog-root .kt-popup-shell {
  background: var(--kt-sf0);
}

.kt-m3-root[data-theme-style="readfrog"] .kt-popup-header,
.kt-readfrog-root .kt-popup-header {
  border-bottom: 1px solid var(--kt-linev);
  background: var(--kt-sf0);
}

.kt-m3-root[data-theme-style="readfrog"] .kt-popup-tabs.MuiTabs-root,
.kt-readfrog-root .kt-popup-tabs.MuiTabs-root {
  border-radius: 8px;
  background: var(--kt-sf2);
  padding: 3px;
}

.kt-m3-root[data-theme-style="readfrog"] .kt-popup-tabs .MuiTab-root,
.kt-readfrog-root .kt-popup-tabs .MuiTab-root {
  border-radius: 6px;
  font-size: 12px;
  font-weight: 550;
}

.kt-m3-root[data-theme-style="readfrog"] .kt-popup-tabs .MuiTab-root.Mui-selected,
.kt-readfrog-root .kt-popup-tabs .MuiTab-root.Mui-selected {
  background: var(--kt-sf0);
  color: var(--kt-on);
  font-weight: 650;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .08);
}

.kt-m3-root[data-theme-style="readfrog"] .kt-popup-hero,
.kt-readfrog-root .kt-popup-hero {
  border-radius: 12px;
  border: 1px solid var(--kt-linev);
}

/* Floating translation selection button & box */
.kt-m3-root[data-theme-style="readfrog"] .KT-tranbtn,
.kt-readfrog-root .KT-tranbtn {
  border-radius: 10px;
  background: var(--kt-pri);
  color: var(--kt-onpri);
  box-shadow: 0 4px 14px rgba(79, 123, 246, 0.35), 0 2px 4px rgba(0, 0, 0, .1);
  transition: transform .15s ease, box-shadow .15s ease, background .2s ease;
}

.kt-m3-root[data-theme-style="readfrog"] .KT-tranbtn:hover,
.kt-readfrog-root .KT-tranbtn:hover {
  transform: scale(1.06);
  box-shadow: 0 6px 18px rgba(79, 123, 246, 0.45), 0 2px 6px rgba(0, 0, 0, .15);
}

.kt-m3-root[data-theme-style="readfrog"] .KT-tranbtn:active,
.kt-readfrog-root .KT-tranbtn:active {
  transform: scale(.95);
}

.kt-m3-root[data-theme-style="readfrog"] .KT-draggable,
.kt-readfrog-root .KT-draggable {
  border-radius: 14px !important;
  border: 1px solid var(--kt-linev) !important;
  box-shadow: 0 12px 32px -4px rgba(0, 0, 0, .16), 0 4px 8px -2px rgba(0, 0, 0, .08) !important;
}

/* Preserved keyframes */
@keyframes kt-m3-pop {
  0% { opacity: 0; transform: scale(.5); }
  65% { opacity: 1; transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes kt-m3-rise {
  from { opacity: 0; transform: translateY(14px) scale(.97); }
  to { opacity: 1; transform: none; }
}

@keyframes kt-m3-spin { to { transform: rotate(360deg); } }

@keyframes kt-m3-sweep {
  0% { left: -40%; width: 40%; }
  55%, 100% { left: 100%; width: 55%; }
}

@keyframes kt-m3-glow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .kt-m3-root[data-theme-style="readfrog"] *,
  .kt-m3-root[data-theme-style="readfrog"] *::before,
  .kt-m3-root[data-theme-style="readfrog"] *::after,
  .kt-readfrog-root *,
  .kt-readfrog-root *::before,
  .kt-readfrog-root *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
`;
