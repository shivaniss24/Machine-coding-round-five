import { Navbar } from "../../components/Navbar/Navbar";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { useRecipes } from "../../contexts/RecipesContext";
import "../Recipes/Recipes.css";
import { BiPlusCircle as AddIcon } from "react-icons/bi";
import { useState } from "react";
import { AddRecipeModal } from "../../components/AddRecipeModal/AddRecipeModal";

export function Recipes() {
  const { recipes } = useRecipes();
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

  return (
    <div className="all-recipes-container">
      <Navbar />

      <h2>All Recipes:</h2>

      <div className="recipes-container">
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
        <AddIcon
          onClick={() => setShowAddRecipeModal(!showAddRecipeModal)}
          className="add-icon"
          size={32}
        />
      </div>

      {showAddRecipeModal && (
        <AddRecipeModal setShowAddRecipeModal={setShowAddRecipeModal} />
      )}
    </div>
  );
}
