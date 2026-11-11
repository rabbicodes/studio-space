
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const getThemeSnapshot = (): Theme => {
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
};

const getServerThemeSnapshot = (): Theme => "dark";

const subscribe = (callback: () => void) => {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
};

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    );

    document.documentElement.style.colorScheme = newTheme;

    window.dispatchEvent(new Event("theme-change"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
