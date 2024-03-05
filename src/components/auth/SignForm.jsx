/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setAuthMode, setUser } from "./authSlice";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../firebaseConfig";
import axios from "axios";

import Input from "../ui/Input";

const SignForm = () => {
  const authMode = useSelector(state => state.auth.authMode);
  
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();

    const URL = authMode === "Se connecter" ? SIGN_IN_URL : SIGN_UP_URL;

    const credentials = {
      email : emailRef.current.value,
      password: passwordRef.current.value,
      returnSecureToken: true
    }

    axios.post(URL, credentials).then((response) => {
      localStorage.setItem("token", response.data.idToken);
      dispatch(setUser(response.data));
    })
  }

  return ( 
    <div className="flex-grow flex flex-col items-center justify-center">
      <p className="mb-8 font-semibold text-lg text-black">Bienvenue sur l'application de recette</p>
      <form className="mx-auto mb-8 text-black" onSubmit={submitForm}>
        <Input 
            label="Email" 
            type="email" 
            placeholder="michel@example.com" 
            isRequired={true} 
            ref={emailRef} 
            defaultValue={""}
        />
        <Input 
            label="Mot de passe" 
            type="password" 
            placeholder="Votre mot de passe" 
            isRequired={true} 
            ref={passwordRef} 
            defaultValue={""}
        />
        <button className="btn block mx-auto mt-3 min-w-[180px] max-w-[300px] box-border h-1 px-2">{authMode}</button>
      </form>
      <button className="block mx-auto" onClick={() => dispatch(setAuthMode(authMode === "Se connecter" ? "S'inscrire" : "Se connecter"))}>
        {authMode === "Se connecter" ? "S'inscrire" : "Se connecter"}
      </button>
    </div>
   );
}
 
export default SignForm;