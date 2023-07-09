import { createRoot } from 'react-dom/client';
import { css } from "styled-components";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.js";
import PlayerContainer from "./pages/PlayerContainer";
import Discovery from "./pages/Discovery";
import "./reset.css";
import './variables.css';

export const themeMixin = css`
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
`;

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '',
        element: <PlayerContainer />
      }, {
        path: "discovery",
        element: <Discovery />
      }
    ]
  },
]);

let root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);