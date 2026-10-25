import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "obsidian" | "light" | "silver" | "imperial";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  tagline: string;
  isDark: boolean;
  accentColor: string;
  bgPreview: string;
  badge: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "light",
    name: "Daylight Atelier",
    tagline: "Sunlit alabaster ivory & saddle leather",
    isDark: false,
    accentColor: "#93532b",
    bgPreview: "#faf7f2",
    badge: "Light Theme",
  },
  {
    id: "obsidian",
    name: "Obsidian Forge",
    tagline: "Midnight forge & glowing ember copper",
    isDark: true,
    accentColor: "#e67e22",
    bgPreview: "#17181f",
    badge: "Dark Atelier",
  },
  {
    id: "silver",
    name: "Silver Damascus",
    tagline: "Cold liquid steel & polished chromium",
    isDark: true,
    accentColor: "#cbd5e1",
    bgPreview: "#161b22",
    badge: "Steel Dark",
  },
  {
    id: "imperial",
    name: "Imperial Damascus",
    tagline: "Deep royal oxblood & 24k burnished gold",
    isDark: true,
    accentColor: "#d4af37",
    bgPreview: "#200b11",
    badge: "Royal Dark",
  },
];

interface ThemeContextType {
  theme: ThemeId;
  themeMeta: ThemeMeta;
  setTheme: (theme: ThemeId) => void;
  toggleLightDark: () => void;
  isDark: boolean;
  availableThemes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "white-hills-atelier-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("obsidian");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      let stored = localStorage.getItem(STORAGE_KEY) as ThemeId | "nordic" | null;
      if (stored === "nordic") stored = "light";
      if (stored && THEMES.some((t) => t.id === stored)) {
        setThemeState(stored as ThemeId);
        applyTheme(stored as ThemeId);
      } else {
        applyTheme("obsidian");
      }
    } catch {
      applyTheme("obsidian");
    }
    setMounted(true);
  }, []);

  const applyTheme = (id: ThemeId) => {
    const meta = THEMES.find((t) => t.id === id) || THEMES[0]!;
    const root = document.documentElement;

    root.classList.add("theme-transitioning");
    root.setAttribute("data-theme", id);

    if (meta.isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    const timer = setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 400);

    return () => clearTimeout(timer);
  };

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
    applyTheme(newTheme);
  };

  const toggleLightDark = () => {
    const currentMeta = THEMES.find((t) => t.id === theme) || THEMES[0]!;
    if (currentMeta.isDark) {
      setTheme("light");
    } else {
      setTheme("obsidian");
    }
  };

  const themeMeta = THEMES.find((t) => t.id === theme) || THEMES[0]!;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMeta,
        setTheme,
        toggleLightDark,
        isDark: themeMeta.isDark,
        availableThemes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
