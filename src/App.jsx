import { useSelector } from 'react-redux';
import recipehomepage from "./assets/recipe-homepage.jpg"
import SignForm from './components/auth/SignForm';
import Recipe from './components/recipes/Recipe';


function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      {
        user ?
              <Recipe />
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
