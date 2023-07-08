import { createRoot } from 'react-dom/client';
import App from "./App.js";
import { createHashRouter, RouterProvider } from "react-router-dom";
import PlayerContainer from "./components/PlayerContainer";
import Discovery from "./components/Discovery";
<App/>
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

let root = createRoot( document.getElementById('root'));
root.render(<RouterProvider router={router} />);