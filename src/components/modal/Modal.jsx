
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";
import { setSelectedRecipe } from "../recipes/recipesSlice";

function Modal({ children }) {

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
        dispatch(setSelectedRecipe(null));
    }

  return createPortal(
    <div className="flex justify-center items-center z-10 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
    <div className="relative w-1/2 h-[90%] p-8 bg-white rounded-lg overflow-scroll" >
      <button className="btn absolute top-4 right-4" onClick={handleCloseModal}>X</button>
      {children}
    </div>
  </div>,
  document.body
  );
}

export default Modal;
