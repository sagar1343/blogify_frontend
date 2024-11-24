import { createContext, ReactNode, useState, useContext } from "react";

const ThemeContext = createContext<() => void | undefined>(() => {});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<boolean>(false);
  const toggleTheme = () => {
    setTheme((prev) => !prev);
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
