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
    }        

})

export const { setIngredients, setRecipes, addRecipe } =  recipesSlice.actions;

export default recipesSlice.reducer;