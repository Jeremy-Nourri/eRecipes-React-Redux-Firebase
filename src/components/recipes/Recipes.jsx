import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

import { BASE_DB_URL } from "../../firebaseConfig";
import { openModal } from "../modal/modalSlice";
import { setRecipes, setSelectedRecipe } from "./recipesSlice";
import { removeUser } from "../auth/authSlice";
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

  const handleUpdateRecipe = (recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    dispatch(openModal());
    dispatch(setSelectedRecipe(recipe));
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
      <header className="flex justify-between items-center p-4 bg-[#00635D] text-white">
        <h1>Application de recettes de cuisine</h1>
        {user && 
          <button className="btn" onClick={() => dispatch(removeUser())}>
            Se déconnecter
          </button>
        }
      </header>
      <main className="h-[100vh] flex flex-col items-center">
        <div>
          <button className="btn btn-ghost mt-4 mb-4 bg-[#00635D] text-white hover:bg-white hover:text-[#00635D]"
           onClick={() => dispatch(openModal())}>
            Ajouter une recette
          </button>
        </div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <article key={recipe.id} className="w-1/2 p-4 border-2 border-[#00635D] rounded-lg mb-4 bg-white">
              <div className="mb-6 flex justify-between">
                <p className="ml-4 text-lg font-semibold">{recipe.title}</p>
                <div>
                  <p className="inline-block mr-2">
                    Cuisson</p>
                  <p className="badge inline-block mr-4 bg-slate-400 text-white">
                    {recipe.cookTime} mins
                  </p>
                  <p className="inline-block mr-2">Préparation</p>
                  <p className="badge inline-block mr-4 bg-slate-400 text-white">{recipe.prepTime} mins</p>
                </div>
              </div>
              <div className="flex justify-around ">
                <p className="ml-4 font-semibold text">Ingrédients</p>
                <p className="mr-4 font-semibold">Instructions</p>
              </div>
              <div className="flex justify-around mb-10">
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}</li>
                  ))}               
                </ul>
                <p>
                    {recipe.instructions}
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <button className="btn" onClick={() => handleDeleteRecipe(recipe.id)} >
                  Supprimer la recette
                </button>
                <button className="btn" onClick={() => handleUpdateRecipe(recipe.id)} >
                  Modifier la recette
                </button>
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
