import "../RecipeDetails/RecipeDetails.css";
import { useParams } from "react-router-dom";
import { useRecipes } from "../../contexts/RecipesContext";
import { BiArrowBack as BackIcon } from "react-icons/bi";
import { Link } from "react-router-dom";

export function RecipeDetails() {
  const { recipeId } = useParams();
  const { recipes } = useRecipes();

  const selectedRecipe = recipes.find(({ id }) => id === Number(recipeId));

  const {
    dishName,
    cuisineType,
    imageUrl,
    ingredients,
    instructions
  } = selectedRecipe;

  return (
    <div className="detail-page-container">
      <div className="details-page-heading-container">
        <Link to="/">
          <BackIcon size={24} style={{ cursor: "pointer" }} />
        </Link>
        <h2>{dishName}</h2>
      </div>
      <div className="recipe-details-card">
        <div className="recipe-details-image-cotainer">
          <img src={imageUrl} alt={dishName} />
        </div>

        <div className="recipe-details-container">
          <strong>Cuisine: {cuisineType}</strong>

          <div className="ingredients-container">
            <p>
              <strong>Ingredients: </strong>
              {ingredients.map(
                (ingredient, i) =>
                  `${ingredient}${i < ingredients.length - 1 ? ", " : "."}`
              )}
            </p>
          </div>

          <div className="intrunctions-container">
            <strong>Instructions: </strong>

            <ol>
              {instructions.map((instruction, i) => {
                return <li key={i}>{instruction}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
