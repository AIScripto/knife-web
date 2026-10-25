import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "obsidian" | "silver" | "nordic" | "imperial";

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
    id: "obsidian",
    name: "Obsidian Forge",
    tagline: "Midnight forge & glowing ember copper",
    isDark: true,
    accentColor: "#e67e22",
    bgPreview: "#17181f",
    badge: "Signature",
  },
  {
    id: "silver",
    name: "Silver Damascus",
    tagline: "Cold liquid steel & polished chromium",
    isDark: true,
    accentColor: "#cbd5e1",
    bgPreview: "#161b22",
    badge: "Steel Precision",
  },
  {
    id: "nordic",
    name: "Nordic Frost",
    tagline: "Sunlit alabaster ivory & saddle leather",
    isDark: false,
    accentColor: "#93532b",
    bgPreview: "#faf7f2",
    badge: "Light Luxury",
  },
  {
    id: "imperial",
    name: "Imperial Damascus",
    tagline: "Deep royal oxblood & 24k burnished gold",
    isDark: true,
    accentColor: "#d4af37",
    bgPreview: "#200b11",
    badge: "Royal Temper",
  },
];

interface ThemeContextType {
  theme: ThemeId;
  themeMeta: ThemeMeta;
  setTheme: (theme: ThemeId) => void;
  availableThemes: ThemeMeta[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "white-hills-atelier-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("obsidian");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (stored && THEMES.some((t) => t.id === stored)) {
        setThemeState(stored);
        applyTheme(stored);
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
      // ignore local storage restrictions
    }
    applyTheme(newTheme);
  };

  const themeMeta = THEMES.find((t) => t.id === theme) || THEMES[0]!;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMeta,
        setTheme,
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
