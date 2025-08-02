import { useContext } from "react";
import { PokemonContext } from "../../App.jsx";
import { BrowserContext } from "../../BrowserRouter/BrowserRouter.jsx";
import PokemonInfoButtons from "./PokemonInfoButtons.jsx";
import PokemonInfoUpper from "./PokemonInfoUpper.jsx";
import PokemonInfoStats from "./PokemonInfoStats.jsx";

function PokemonInfo({ id }){
    const { pageFound } = useContext(BrowserContext);
    const [pokemonList] = useContext(PokemonContext);
    const [pokemon] = pokemonList.filter(pokemon => pokemon.name == id);

    //Jos url:än id:llä ei löydy yhtäkään pokemonia
    if(!pokemon){
        pageFound.current = false;
        return null;
    }

    return (
        <div className="pokemon-info-container">
            <PokemonInfoButtons currentPokemon={pokemon}/>
            <PokemonInfoUpper pokemon={pokemon}/>
            <h1 id="pokemon-info-id">
                #{(pokemon.id/100).toFixed(2).toString().replace(".", "")}
            </h1>
            <PokemonInfoStats pokemon={pokemon}/>
        </div>
    );

}

export default PokemonInfo;
