import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../auth/authSlice";
import { openModal } from "../modal/modalSlice";
import Modal from "../modal/Modal";
import RecipeForm from "./RecipeForm";
import Button from "../ui/Button";

function Recipe() {

    const dispatch = useDispatch();
    const isModalOpen = useSelector(state => state.modal.isOpen);

  return (
    <>
      <header>
        <h1>Application de recettes de cuisine</h1>
        <Button
          func={dispatch(removeUser())}
          text="Déconnexion"
          type="button"
          background="bg-blue-800"
          textColor="text-white"
        />
      </header>
      <main>
        <div>
            <button onClick={() => dispatch(openModal)}>
                Ajouter une recette
            </button>
        </div>
        <article className="w-2/3 mx-auto mt-10 border border-[#00635D] bg-slate-50">
          <div className="flex justify-between">
            <p className="ml-4">titre</p>
            <div>
              <p className="inline-block mr-4">temps</p>
              <p className="inline-block mr-4">température</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="ml-4">Ingrédients</p>
            <p className="mr-4">Instructions</p>
          </div>
          <div>
            <ul>
              <li></li>
            </ul>
            <p></p>
          </div>
        </article>
      </main>

      {
        isModalOpen && (
            <Modal>
                <RecipeForm />
            </Modal>
        )

      }
    </>
  );
}

export default Recipe;
