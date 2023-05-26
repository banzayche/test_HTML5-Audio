import { createContext } from "react";
export const colorThemeSchema = {
  dark: 'dark',
  light: 'light'
}
const ThemeContext = createContext(null);
export default ThemeContext;