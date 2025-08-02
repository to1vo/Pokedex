import { useEffect, useContext, useState } from "react";
import { PokemonContext } from "../../App.jsx";
import PokemonCardsSort from "./PokemonCardsSort.jsx";
import PokemonCard from "./PokemonCard.jsx";
import ScrollToTop from "../../components/ScrollToTop.jsx";
import PokemonSearch from "./PokemonSearch.jsx";

function PokemonCards({ sortBy }){
    const [pokemonList] = useContext(PokemonContext);
    const [searchValue, setSearchValue] = useState("");
    const [foundPokemon, setFoundPokemon] = useState(true);
    
    useEffect(() => {
        document.querySelector("#root").style = "";
    }, []);

    return (
        <>
            <PokemonCardsSort sortByState={sortBy} />
            <PokemonSearch 
                searchValue={searchValue} 
                setSearchValue={setSearchValue} 
                setFoundPokemon={setFoundPokemon} 
            />
            <div className="pokemon-cards-container">
                {foundPokemon
                ? pokemonList.map(pokemon => {
                    if(pokemon.name.includes(searchValue.trim().toLocaleLowerCase())){
                        return <PokemonCard pokemon={pokemon} key={pokemon.name}/> 
                    }
                })
                : <p>No Pokémon found with your search...</p>
                }
            </div>
            <ScrollToTop />
        </>
    );
}

export default PokemonCards;
