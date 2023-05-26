import './App.scss';
import Discovery from "./components/Discovery";
import ThemeContext, { colorThemeSchema } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Toggle from "./components/Toggle";

const isDiscovery = window.location.pathname.replace(/\//g, '') === 'discovery';
const App = () => {
  const [theme, setTheme] = useState('dark');
  const updateTheme = (newValue) => {
    setTheme(newValue);
  };

  useEffect(() => {
    const colorTheme = JSON.parse(localStorage.getItem('theme')) || 'dark';
    updateTheme(colorTheme);
  }, []);

  if (isDiscovery) {
    return <ThemeContext.Provider value={{theme, updateTheme}}><Discovery className={classNames({dark: theme === colorThemeSchema.dark, light: theme === colorThemeSchema.light})} /></ThemeContext.Provider>;
  }
  return (
    <ThemeContext.Provider value={{theme, updateTheme}}>
      <div className={classNames('App', {dark: theme === colorThemeSchema.dark, light: theme === colorThemeSchema.light})}>
        <label className="toggle">
          <Toggle checked={theme === colorThemeSchema.dark} value={theme} onChange={() => setTheme(theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark)} />
          <span className="toggle-label">Switch to {theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark} theme</span>
        </label>
        My App TEST
      </div>
    </ThemeContext.Provider>
  );
}
export default App;