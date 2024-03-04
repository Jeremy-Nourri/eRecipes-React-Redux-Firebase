import { Input } from "postcss";
import { useRef } from "react";
import { ingredients } from "../../data/data";

function RecipeForm() {

    const { id } = useParams()
    const movie = id ? movies.find((movie) => movie._id == id) : null

    const inputTitle = useRef();
    const inputInstructions = useRef();
    const inputCookTime = useRef();
    const inputPrepTime = useRef();
    const inputIngredients = useRef();

    const recipe = {
        id: string,
        title: string,
        instructions: string,
        cookTime: number,
        prepTime: number,
        ingredients: [
            {
                id: number,
                name: string,
            }
        ]

    }
    return ( 
        <form onSubmit={handleSubmit} className="text-sm text-center">

        <h2 className="text-lg font-bold text-blue-700 mb-4">{mode} un film</h2>
        <Input 
            label="Titre" 
            type="text" 
            placeholder="" 
            isRequired={true} 
            ref={inputTitle} 
            defaultValue={recipeFound?.title ?? ''}
        />

        
        <button type="submit" className="btn">{mode}</button>
    </form>
     );
}

export default RecipeForm;