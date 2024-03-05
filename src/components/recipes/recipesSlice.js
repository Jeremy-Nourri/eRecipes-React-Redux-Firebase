import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
    name: "recipes",
    initialState: {    
        formMode: "",    
        recipes: [],    
        selectedRecipe: null,    
        ingredients: [],    
        isLoading: false,    
        error: null
    },
    reducers: {
        setIngredients: (state, action) => {
            state.ingredients = action.payload;
        },
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        },
        addRecipe: (state, action) => {
            state.recipes.push(action.payload)
        },
        updateRecipe: (state, action) => {
            const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
            state.recipes[index] = action.payload;
        },
        setSelectedRecipe: (state, action) => {
            state.selectedRecipe = action.payload;
        },
    }        

})

export const { setIngredients, setRecipes, addRecipe, updateRecipe, setSelectedRecipe } =  recipesSlice.actions;

export default recipesSlice.reducer;