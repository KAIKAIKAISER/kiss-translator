import { useCallback } from "react";
import { useSetting } from "./Setting";
import { THEME_STYLE_M3 } from "../config";

/**
 * 深色模式状态切换与管理自定义 Hook
 * @returns {object} { darkMode: string, toggleDarkMode: function }
 */
export function useDarkMode() {
  // 从通用设置中解构获取 darkMode 和更新设置的方法
  const {
    setting: { darkMode },
    updateSetting,
  } = useSetting();

  // 切换深色模式的触发方法：循环切换：light -> dark -> auto -> light
  const toggleDarkMode = useCallback(() => {
    const nextMode = {
      light: "dark",
      dark: "auto",
      auto: "light",
    };
    updateSetting({ darkMode: nextMode[darkMode] || "light" });
  }, [darkMode, updateSetting]);

  return { darkMode, toggleDarkMode };
}

/**
 * 主题风格状态与管理自定义 Hook
 * @returns {object} { themeStyle: string, updateThemeStyle: function }
 */
export function useThemeStyle() {
  const { setting, updateSetting } = useSetting();
  const themeStyle = setting?.themeStyle || THEME_STYLE_M3;
  const updateThemeStyle = useCallback(
    (style) => updateSetting({ themeStyle: style }),
    [updateSetting]
  );
  return { themeStyle, updateThemeStyle };
}
