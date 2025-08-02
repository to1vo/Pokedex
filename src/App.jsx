import { useState, useEffect, createContext } from "react";
import BrowserRouter from "./BrowserRouter/BrowserRouter.jsx";
import Route from "./BrowserRouter/Route.jsx"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import PokemonCards from "./Pages/PokemonCards/PokemonCards.jsx";
import PokemonInfo from "./Pages/PokemonInfo/PokemonInfo.jsx";
import useFetchPokemonList from "./useFetchPokemonList.js";
import Loading from "./components/Loading.jsx";

//Context johon tallennetaan pokemonlista
//Jotta lista voidaan jakaa kaikille komponenteille
const PokemonContext = createContext();

function App() {
  const { data, loading, error } = useFetchPokemonList();
  const [pokemonList, setPokemonList] = useState(data);
  const [sortBy, setSortBy] = useState("LOWEST");

  useEffect(() => {
    setPokemonList(data);
  }, [data]);

  //Virhe ilmoitus käyttäjälle
  if(error){
    return (
      <>
        <Header />
        <h1 id="error-alert">Error occured, try again</h1>
        <Footer />
      </>
    );
  }
  
  //Lataus ilmoitus käyttäjälle
  if(loading){
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
  }
  
  //Kun data on saatu pokemonlistaan
  if(pokemonList){
    return (
      <>
        <Header />
        <BrowserRouter>
          <PokemonContext.Provider value={[pokemonList, setPokemonList]}>
              <Route path={"/"}>
                <PokemonCards sortBy={[sortBy, setSortBy]}/>
              </Route>
              <Route path={"/:id"}>
                <PokemonInfo />
              </Route>
          </PokemonContext.Provider>
        </BrowserRouter>
        <Footer />
      </>
    )
  }
}

export default App;
export { PokemonContext };
