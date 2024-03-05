import { useSelector } from 'react-redux';
import recipehomepage from "./assets/recipe-homepage.jpg"
import SignForm from './components/auth/SignForm';
import Recipes from './components/recipes/Recipes';


function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      {
        user ?
              <Recipes />
        :
          <main>
            <img className="max-h-screen inline-block" src={recipehomepage} alt="plat" />
            <SignForm />
          </main>
      }
    </>
  )
}

export default App
