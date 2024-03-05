import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { BASE_DB_URL } from "../../firebaseConfig";
import { openModal } from "../modal/modalSlice";
import { setRecipes } from "./recipesSlice";
import Modal from "../modal/Modal";
import RecipeForm from "./RecipeForm";

function Recipes() {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipes.recipes);
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const user = useSelector((state) => state.auth.user);

  const handleDeleteRecipe = (recipeId) => {
    axios.delete(`${BASE_DB_URL}recipes/${recipeId}.json?auth=${user.idToken}`).then(() => {
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
      dispatch(setRecipes(updatedRecipes));
    });
    console.log(recipeId);
    console.log(user.idToken);
    console.log(recipes);
  }

  useEffect(() => {
    axios.get(`${BASE_DB_URL}recipes.json`).then((response) => {

      const recipes = [];
      for (const key in response.data) {
        recipes.push({ id: key, ...response.data[key] });
      }
      dispatch(setRecipes(recipes));
      console.log(response.data)
    });
  }, [dispatch]);

  return (
    <>
      <header>
        <h1>Application de recettes de cuisine</h1>
      </header>
      <main>
        <div>
          <button onClick={() => dispatch(openModal())}>
            Ajouter une recette
          </button>
        </div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <article key={recipe.id} className="w-2/3 mx-auto mt-10 border border-[#00635D] bg-slate-50">
              <div className="flex justify-between">
                <p className="ml-4">{recipe.title}</p>
                <div>
                  <p className="inline-block mr-4">{recipe.cookTime}</p>
                  <p className="inline-block mr-4">{recipe.prepTime}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="ml-4">Ingrédients</p>
                <p className="mr-4">Instructions</p>
              </div>
              <div>
                <ul>
                {
                  recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.name}
                    </li>
                  ))
                }                  
                </ul>
                <p>
                    {recipe.instructions}
                </p>
              </div>
              <div>
                <button onClick={() => handleDeleteRecipe(recipe.id)} >Supprimer la recette</button>
              </div>
            </article>
          ))
          )
          :
        (
          <p>Pas de recette</p>
        )
        }
      </main>

      {isModalOpen && (
        <Modal>
          <RecipeForm />
        </Modal>
      )}
    </>
  );
}

export default Recipes;
