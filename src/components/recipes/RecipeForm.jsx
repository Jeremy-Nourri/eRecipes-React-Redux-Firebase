import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { BASE_DB_URL } from "../../firebaseConfig";
import { addRecipe } from "./recipesSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { ingredients } from "../../data/data";

function RecipeForm() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const recipes = useSelector((state) => state.recipes.recipes);

  const { id } = useParams();

  const recipeFound = id ? recipes.find((recipe) => recipe.id == id) : null;

  const inputTitle = useRef();
  const inputInstructions = useRef();
  const inputCookTime = useRef();
  const inputPrepTime = useRef();

  const [ingredientsChecked, setIngredientsChecked] = useState([]);

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
    if (user.idToken) {
      axios
        .post(`${BASE_DB_URL}recipes.json?auth=${user.idToken}`, newRecipe)
        .then((response) => {
          console.log(response.data);
          dispatch(addRecipe(newRecipe));
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-sm text-center">
      <h2 className="text-lg font-bold text-blue-700 mb-4">
        {id ? "Modifier" : "Ajouter"} une recette
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

      {ingredients.map((ingredient) => (
        <label key={ingredient.id} className="flex items-center">
          {ingredient.name}
          <input
            type="checkbox"
            value={ingredient.name}
            onChange={(e) => handleCheckBoxes(e, ingredient.id)}
          />
        </label>
      ))}

      <label className="mt-2 flex flex-col justify-center items-center text-sm lg:text-md">
        Instructions
        <textarea
          name="instructions"
          cols="30"
          rows="10"
          ref={inputInstructions}
          defaultValue={recipeFound?.instructions ?? ""}
        ></textarea>
      </label>

      <Button
        text="Ajouter"
        type="submit"
        background="bg-blue-700"
        textColor="text-white"
      />
    </form>
  );
}

export default RecipeForm;
