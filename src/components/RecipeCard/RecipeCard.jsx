import "../RecipeCard/RecipeCard.css";
import { Link } from "react-router-dom";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { useRecipes } from "../../contexts/RecipesContext";

export function RecipeCard({ recipe }) {
  const { id, dishName, cuisineType, imageUrl } = recipe;
  const { recipeDispatch } = useRecipes();

  return (
    <div className="dish-card-container">
      <div className="dish-image-container">
        <img src={imageUrl} alt={dishName} />
      </div>

      <h3>{dishName}</h3>

      <div className="cuisine-type-container">
        <p>
          <strong>Cuisine Type:</strong>
        </p>
        <p>{cuisineType}</p>
      </div>

      <div className="ingredeients-instructions-container">
        <p>
          <strong>Ingredients & Instructions:</strong>
        </p>
        <Link to={`/recipe/${id}`}>Recipe {">"}</Link>
      </div>

      <div
        onClick={() =>
          recipeDispatch({ type: "DELETE_RECIPE", payload: recipe })
        }
        className="action-icons-container"
      >
        <DeleteIcon size={20} />
      </div>
    </div>
  );
}
