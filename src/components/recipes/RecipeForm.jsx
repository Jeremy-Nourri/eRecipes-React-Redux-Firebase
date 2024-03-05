import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";

import axios from "axios";

import { BASE_DB_URL } from "../../firebaseConfig";
import { addRecipe, updateRecipe } from "./recipesSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { ingredientsData } from "../../data/data";

function RecipeForm() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const recipeFound = useSelector((state) => state.recipes.selectedRecipe);

  const inputTitle = useRef();
  const inputInstructions = useRef();
  const inputCookTime = useRef();
  const inputPrepTime = useRef();

  const [ingredientsChecked, setIngredientsChecked] = useState(recipeFound?.ingredients ?? []);

  const handleCheckBoxes = (e, ingredientId) => {
    if (e.target.checked) {
      setIngredientsChecked([...ingredientsChecked, { id: ingredientId, name: e.target.value },]);
    } else {
      setIngredientsChecked(ingredientsChecked.filter((ingredient) => ingredient.id !== ingredientId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title: inputTitle.current.value,
      instructions: inputInstructions.current.value,
      cookTime: inputCookTime.current.value,
      prepTime: inputPrepTime.current.value,
      ingredients: ingredientsChecked,
    };

    if (recipeFound) {
        axios
            .put(`${BASE_DB_URL}recipes/${recipeFound.id}.json?auth=${user.idToken}`, newRecipe)
            .then(() => {
                dispatch(updateRecipe({ id: recipeFound.id, ...newRecipe }));
            });
        } else {
            axios
            .post(`${BASE_DB_URL}recipes.json?auth=${user.idToken}`, newRecipe)
            .then((response) => {
                dispatch(addRecipe({ id: response.data.name, ...newRecipe }));
            });
        }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center text-sm text-center">
      <h2 className="text-lg font-bold text-[#00635D] mb-4">
        {recipeFound ? "Modifier" : "Ajouter"} une recette
      </h2>
      <Input
        label="Titre"
        type="text"
        placeholder=""
        isRequired={true}
        ref={inputTitle}
        defaultValue={recipeFound?.title ?? ""}
      />
      <Input
        label="Temps de cuisson (mins)"
        type="number"
        placeholder=""
        isRequired={true}
        ref={inputCookTime}
        defaultValue={recipeFound?.cookTime ?? ""}
      />
      <Input
        label="Temps de préparation (mins)"
        type="number"
        placeholder=""
        isRequired={true}
        ref={inputPrepTime}
        defaultValue={recipeFound?.prepTime ?? ""}
      />

      {
        recipeFound ? (
            <div className="my-4 w-full flex justify-evenly">
                {ingredientsData.map((ingredient) => (
                <label key={ingredient.id} className="flex items-center justify-center">
                    <input
                    type="checkbox"
                    value={ingredient.name}
                    onChange={(e) => handleCheckBoxes(e, ingredient.id)}
                    checked={ingredientsChecked.some((ing) => ing.id === ingredient.id)}
                    className="mr-2"
                    />
                    {ingredient.name}
                </label>
                ))}
            </div>
            ) : (
            <div className="my-4 w-full flex justify-evenly">
                {ingredientsData.map((ingredient) => (
                <label key={ingredient.id} className="flex items-center justify-center">
                    <input
                    type="checkbox"
                    value={ingredient.name}
                    onChange={(e) => handleCheckBoxes(e, ingredient.id)}
                    className="mr-2"
                    />
                    {ingredient.name}
                </label>
                ))}
            </div>
            )
        }

      <label className="mt-2 flex flex-col justify-center items-center text-sm lg:text-md">
        Instructions
        <textarea
          name="instructions"
          cols="60"
          rows="10"
          ref={inputInstructions}
          defaultValue={recipeFound?.instructions ?? ""}
          className="border border-gray-300 rounded-md p-2"
        />
      </label>

      <Button
        text={recipeFound ? "Modifier" : "Ajouter"}
        type="submit"
        background="bg-[#00635D]"
        textColor="text-white"
      />

    </form>
  );
}

export default RecipeForm;
