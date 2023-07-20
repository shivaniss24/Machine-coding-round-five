import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Recipes } from "./pages/Recipes/Recipes";
import { RecipeDetails } from "./pages/RecipeDetails/RecipeDetails";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Recipes />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </div>
  );
}
