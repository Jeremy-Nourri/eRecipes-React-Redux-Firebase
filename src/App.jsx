import { useSelector } from 'react-redux';
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
          <main className="flex w-full h-[100vh]">
            <div className="grid flex-grow bg-[url('./assets/recipe-homepage.jpg')] bg-cover">
            </div>
            <SignForm />
          </main>
      }
    </>
  )
}

export default App
