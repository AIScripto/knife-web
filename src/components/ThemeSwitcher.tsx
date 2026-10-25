import React, { useState } from "react";
import { useTheme, type ThemeId, THEMES } from "@/context/ThemeContext";
import { Flame, Sparkles, Sun, Crown, Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const themeIcons: Record<ThemeId, React.ElementType> = {
  obsidian: Flame,
  silver: Sparkles,
  nordic: Sun,
  imperial: Crown,
};

export function HeaderThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const current = THEMES.find((t) => t.id === theme) || THEMES[0]!;
  const Icon = themeIcons[current.id];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change atelier theme"
        className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md transition-all hover:border-primary/60 hover:shadow-sm"
      >
        <span
          className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border"
          style={{ backgroundColor: current.accentColor }}
        />
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="hidden sm:inline font-sans tracking-wider text-[0.7rem] uppercase">
          {current.name.split(" ")[0]}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-72 origin-top-right rounded-xl border border-border bg-popover/95 p-2 shadow-2xl backdrop-blur-xl">
            <div className="border-b border-border px-3 py-2">
              <p className="eyebrow text-[0.6rem] text-primary">Atelier Aesthetics</p>
              <p className="text-xs text-muted-foreground mt-0.5">Select your viewing mood</p>
            </div>
            <div className="mt-1 space-y-1">
              {THEMES.map((t) => {
                const TIcon = themeIcons[t.id];
                const active = t.id === theme;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-all",
                      active
                        ? "bg-primary/15 text-primary font-medium"
                        : "text-foreground hover:bg-muted/70",
                    )}
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border shadow-sm"
                      style={{ backgroundColor: t.accentColor }}
                    >
                      <TIcon className={cn("h-3 w-3", t.isDark ? "text-stone-900" : "text-white")} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-foreground tracking-wide">{t.name}</span>
                        <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground opacity-80">
                          {t.badge}
                        </span>
                      </div>
                      <p className="text-[0.68rem] text-muted-foreground truncate">{t.tagline}</p>
                    </div>
                    {active && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function FloatingThemeBar() {
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside aria-label="Theme selection dock" className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-2">
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-border bg-card/90 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300",
          collapsed ? "opacity-90 hover:opacity-100" : "ring-1 ring-primary/40",
        )}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          title="Toggle Atelier Atmosphere"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:scale-110"
        >
          <Palette className="h-4 w-4" />
        </button>

        {!collapsed && (
          <div className="flex items-center gap-1 pr-1.5 animate-in fade-in slide-in-from-right-3 duration-200">
            {THEMES.map((t) => {
              const TIcon = themeIcons[t.id];
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={`${t.name} — ${t.tagline}`}
                  className={cn(
                    "group relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-current"
                    style={{ backgroundColor: t.accentColor }}
                  />
                  <TIcon className="h-3.5 w-3.5" />
                  <span className="font-sans text-[0.68rem] uppercase tracking-wider">{t.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
