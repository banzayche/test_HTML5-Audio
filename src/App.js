import './App.scss';
import ThemeContext, { colorThemeSchema } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Toggle from "./components/ui-kit/Toggle";
import { Link, Outlet, useLocation } from "react-router-dom";


const App = () => {
  const [theme, setTheme] = useState('dark');
  const {pathname} = useLocation();
  useEffect(() => {
    const colorTheme = JSON.parse(localStorage.getItem('theme')) || 'dark';
    updateTheme(colorTheme);
  }, []);

  const updateTheme = (newValue) => {
    setTheme(newValue);
  };

  return (
    <ThemeContext.Provider value={{theme, updateTheme}}>

      <div className={classNames('App', {dark: theme === colorThemeSchema.dark, light: theme === colorThemeSchema.light})}>
        <div className='theme-toggle'>
          <Link to={pathname === '/discovery' ? '/' : '/discovery'} className="__goToLink">{pathname === '/discovery' ? '<---' : 'Components sets page'}</Link>
          <label>
            <Toggle checked={theme === colorThemeSchema.dark} value={theme} onChange={() => setTheme(theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark)} />
            <span className="toggle-label">Switch to {theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark} theme</span>
          </label>
        </div>
        <Outlet></Outlet>
      </div>
    </ThemeContext.Provider>
  );
}
export default App;