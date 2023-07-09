import { useEffect, useState } from "react";
import classNames from "classnames";
import Toggle from "./components/ui-kit/Toggle";
import styled from 'styled-components';
import { Link, Outlet, useLocation } from "react-router-dom";
import ThemeContext, { colorThemeSchema } from "./contexts/ThemeContext";
import { themeMixin } from "./index";

const StyledApp = styled.div`
  ${themeMixin};
  height: 100%;
  transition-property: background-color, color;
  transition-timing-function: linear;
  transition-duration: .5s;

  &.dark {
    background-color: var(--dark-mode-bg);
    color: var(--dark-mode-text);
    border-color: var(--dark-mode-text);
  }
  &.light {
    background-color: var(--ligh-mode-bg);
    color: var(--light-mode-text);
    border-color: var(--light-mode-text);
  }

  .top-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 20px 40px;
  }
`;

const StyledLink = styled(Link)`
  opacity: 0.8;
  font-size: 12px;
  font-style: oblique;
  display: inline-block;
  letter-spacing: .15rem;
  transition: var(--transition);
  padding: 0;
  text-underline-offset: 5px;
  font-weight: 400;
  color: inherit;

  &:active {
    transform: scale(.9,.9);
  }

  &:hover {
    opacity: 1;
  }
`;

const App = () => {
  const [theme, setTheme] = useState('');
  const {pathname} = useLocation();
  useEffect(() => {
    const colorTheme = localStorage.getItem('theme') || 'dark';
    setTheme(colorTheme);
  }, []);

  useEffect(() => {
    if (theme) localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>

      <StyledApp className={classNames({dark: theme === colorThemeSchema.dark, light: theme === colorThemeSchema.light})}>
        <div className='top-bar'>
          <StyledLink to={pathname === '/discovery' ? '/' : '/discovery'}>{pathname === '/discovery' ? '<---' : 'Components sets page'}</StyledLink>
          <label>
            <Toggle checked={theme === colorThemeSchema.dark} value={theme} onChange={() => setTheme(theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark)} />
            <span>Switch to {theme === colorThemeSchema.dark ? colorThemeSchema.light : colorThemeSchema.dark} theme</span>
          </label>
        </div>
        <Outlet></Outlet>
      </StyledApp>
    </ThemeContext.Provider>
  );
}
export default App;