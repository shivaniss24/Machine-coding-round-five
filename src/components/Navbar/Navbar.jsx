import { useRecipes } from "../../contexts/RecipesContext";
import "../Navbar/Navbar.css";

export function Navbar() {
  const { recipeDispatch } = useRecipes();

  return (
    <nav className="nav-container">
      <input
        onChange={(e) =>
          recipeDispatch({ type: "SEARCH_VALUE", payload: e.target.value })
        }
        type="text"
        placeholder="Search the item you want..."
        className="search-bar"
      />

      <hr></hr>

      <h3>Search by:</h3>

      <label>
        <input
          onChange={(e) =>
            recipeDispatch({ type: "SEARCH_METHOD", payload: e.target.value })
          }
          defaultChecked
          value="name"
          type="radio"
          name="search-by"
        />
        Name
      </label>
      <label>
        <input
          onChange={(e) =>
            recipeDispatch({ type: "SEARCH_METHOD", payload: e.target.value })
          }
          value="ingredients"
          type="radio"
          name="search-by"
        />
        Ingredients
      </label>
      <label>
        <input
          onChange={(e) =>
            recipeDispatch({ type: "SEARCH_METHOD", payload: e.target.value })
          }
          value="cuisine"
          type="radio"
          name="search-by"
        />
        Cuisine
      </label>
    </nav>
  );
}
