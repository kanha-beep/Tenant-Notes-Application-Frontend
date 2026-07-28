import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CurrenUserContext from "./Components/CurrentUserContext.jsx"
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <CurrenUserContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CurrenUserContext>
);
