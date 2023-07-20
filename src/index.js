import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { RecipesProvider } from "./contexts/RecipesContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </Router>
  </StrictMode>
);
