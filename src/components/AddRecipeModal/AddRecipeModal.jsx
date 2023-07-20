import { useState } from "react";
import { useRecipes } from "../../contexts/RecipesContext";
import "../AddRecipeModal/AddRecipeModal.css";
import { MdOutlineClose as CloseIcon } from "react-icons/md";

export function AddRecipeModal({ setShowAddRecipeModal }) {
  const { recipeDispatch } = useRecipes();
  const [newRecipe, setNewRecipe] = useState({
    dishName: "",
    cuisineType: "",
    ingredients: "",
    instructions: "",
    imageUrl: ""
  });

  const handleClick = () => {
    recipeDispatch({ type: "ADD_RECIPE", payload: newRecipe });
    setShowAddRecipeModal(false);
  };

  return (
    <div className="add-recipe-modal-container">
      <div className="add-recipe-form-container">
        <div className="add-recipe-form-header-container">
          <h3>Add Recipe</h3>
          <div
            className="close-icon"
            onClick={() => setShowAddRecipeModal(false)}
          >
            <CloseIcon size={16} />
          </div>
        </div>

        <hr></hr>

        <input
          onChange={(e) =>
            setNewRecipe((prev) => ({ ...prev, dishName: e.target.value }))
          }
          type="text"
          placeholder="Enter dish name..."
        />

        <input
          onChange={(e) =>
            setNewRecipe((prev) => ({ ...prev, cuisineType: e.target.value }))
          }
          type="text"
          placeholder="Enter cuisne type..."
        />

        <label>
          <input
            onChange={(e) =>
              setNewRecipe((prev) => ({ ...prev, ingredients: e.target.value }))
            }
            type="text"
            placeholder="Enter ingredients..."
          />
          <small>*Separated by comma</small>
        </label>

        <label>
          <input
            onChange={(e) =>
              setNewRecipe((prev) => ({
                ...prev,
                instructions: e.target.value
              }))
            }
            type="text"
            placeholder="Enter instructions..."
          />
          <small>*Separated by comma</small>
        </label>

        <input
          onChange={(e) =>
            setNewRecipe((prev) => ({
              ...prev,
              imageUrl: e.target.value
            }))
          }
          type="text"
          placeholder="Enter media link..."
        />

        <hr></hr>

        <button onClick={handleClick} className="add-button">
          Add
        </button>
      </div>
    </div>
  );
}
