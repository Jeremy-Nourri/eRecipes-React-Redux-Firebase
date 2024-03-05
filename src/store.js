import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./components/auth/authSlice";
import recipesSlice from "./components/recipes/recipesSlice";
import modalSlice from "./components/modal/modalSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        recipes: recipesSlice,
        modal: modalSlice
    }
})