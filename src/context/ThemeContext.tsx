import { createContext, ReactNode, useState, useContext } from "react";

const ThemeContext = createContext<() => void | undefined>(() => {});

function ThemeProvider({ children }: { children: ReactNode }) {
  const isLocalTheme = localStorage.getItem("theme") == "true";
  const [theme, setTheme] = useState<boolean>(isLocalTheme);
  const toggleTheme = () => {
    setTheme((prev) => {
      localStorage.setItem("theme", String(!prev));
      return !prev;
    });
  };
  return (
    <ThemeContext.Provider value={toggleTheme}>
      <div data-theme={theme ? "night" : "light"}>{children}</div>
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
