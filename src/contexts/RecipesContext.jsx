import { createContext, useContext, useEffect, useReducer } from "react";
import { recipes } from "../db/recipes";

const RecipesContext = createContext();

const recipeReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_RECIPES":
      return { ...state, recipes: payload };
    case "SEARCH_METHOD":
      return { ...state, searchMethod: payload };
    case "SEARCH_VALUE":
      return { ...state, searchValue: payload };
    case "ADD_RECIPE": {
      const newRecipes = [...state.recipes];
      const newlyAddedRecipe = { ...payload };

      const maxId = newRecipes.reduce((max, recipe) => {
        return recipe.id > max ? recipe.id : max;
      }, 0);

      newlyAddedRecipe.id = maxId + 1;
      newlyAddedRecipe.ingredients = payload.ingredients.split(",");
      newlyAddedRecipe.instructions = payload.instructions.split(",");
      newRecipes.push(newlyAddedRecipe);

      localStorage.setItem("recipes", JSON.stringify(newRecipes));

      return { ...state, recipes: newRecipes };
    }
    case "DELETE_RECIPE": {
      let newRecipes = [...state.recipes];
      const selectedRecipe = { ...payload };

      newRecipes = newRecipes.filter(
        (recipe) => recipe.id !== selectedRecipe.id
      );

      localStorage.setItem("recipes", JSON.stringify(newRecipes));

      return { ...state, recipes: newRecipes };
    }
    default:
      return { ...state };
  }
};

export function RecipesProvider({ children }) {
  const [recipeState, recipeDispatch] = useReducer(recipeReducer, {
    recipes: [],
    searchMethod: "name",
    searchValue: ""
  });

  useEffect(() => {
    const existingRecipes = localStorage.getItem("recipes");

    if (existingRecipes) {
      recipeDispatch({
        type: "SET_RECIPES",
        payload: JSON.parse(existingRecipes)
      });
    } else {
      recipeDispatch({
        type: "SET_RECIPES",
        payload: recipes
      });
    }
  }, []);

  const applyFilters = (recipes) => {
    let filteredRecipes = [...recipes];
    const searchMethod = recipeState.searchMethod;
    const searchValue = recipeState.searchValue;

    if (searchMethod.length > 0) {
      if (searchValue.length > 0) {
        switch (searchMethod) {
          case "name": {
            return (filteredRecipes = filteredRecipes.filter(({ dishName }) =>
              dishName.toLowerCase().includes(searchValue.toLowerCase())
            ));
          }
          case "ingredients": {
            return (filteredRecipes = filteredRecipes.filter(
              ({ ingredients }) =>
                ingredients
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            ));
          }
          case "cuisine": {
            return (filteredRecipes = filteredRecipes.filter(
              ({ cuisineType }) =>
                cuisineType.toLowerCase().includes(searchValue.toLowerCase())
            ));
          }
          default:
            return;
        }
      }
    }

    return filteredRecipes;
  };

  const filteredRecipes = applyFilters(recipeState.recipes);

  return (
    <RecipesContext.Provider
      value={{
        recipes: filteredRecipes,
        searchMethod: recipeState.searchMethod,
        searchValue: recipeState.searchValue,
        recipeDispatch
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

export const useRecipes = () => useContext(RecipesContext);
