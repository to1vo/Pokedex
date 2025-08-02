import { useEffect, useContext } from "react";
import { PokemonContext } from "../../App";
import SearchIcon from "../../assets/search-icon.png";

function PokemonSearch({ searchValue, setSearchValue, setFoundPokemon }){
    const [pokemonList] = useContext(PokemonContext);

    useEffect(() => {
        //Käydään pokemonlista läpi ja katsotaan 
        //löytyykö hakusanalla yhtäkään pokemonia
        //Vois tehä jotenkin järkevämmin?
        const foundPokemonList = pokemonList.map(pokemon => {
            if(pokemon.name.includes(searchValue.trim().toLocaleLowerCase())){
                return "found";
            }
        })
        if(foundPokemonList.includes("found")) {
            setFoundPokemon(true)
            return;
        };
        setFoundPokemon(false);
    }, [searchValue]);

    const handleSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <div id="search-input-container">
            <div>
                <input 
                    type="text" 
                    value={searchValue} 
                    onChange={handleSearchInput} 
                    placeholder="Search Pokémon..." 
                    spellCheck="false"
                />
                <img src={SearchIcon} alt="search-icon" />
            </div>
        </div>
    );
}

export default PokemonSearch;