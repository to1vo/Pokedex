import { useContext, useEffect } from "react";
import { PokemonContext } from "../../App.jsx";

function PokemonCardsSort({ sortByState }){
    const [, setPokemonList] = useContext(PokemonContext); 
    const [sortBy, setSortBy] = sortByState;

    useEffect(() => {
        //Lajitellaan pokemonlista tallennetun arvon mukaan
        handleSortBy(sortBy);
        //Jos käyttäjä siirtyy info sivulle lajitellaan pokemonlista alkuperäiseen järjestykseen
        //Jotta pokemonlistan selaus toimii oikein
        return () => setPokemonList(prev => [...prev].sort((a, b) => a.id - b.id));
    }, [])

    const handleSortBy = (sortValue) => {
        switch(sortValue){
            case "HIGHEST": {
                setPokemonList(prev => [...prev].sort((a, b) => b.id - a.id));
                setSortBy(sortValue);
                break;
            }
            case "LOWEST": {
                setPokemonList(prev => [...prev].sort((a, b) => a.id - b.id));
                setSortBy(sortValue);
                break;
            }
            case "A-Z": {
                setPokemonList(prev => [...prev].sort((a, b) => a.name < b.name ? -1 : 1));
                setSortBy(sortValue);
                break;
            }
            case "Z-A": {
                setPokemonList(prev => [...prev].sort((a, b) => a.name > b.name ? -1 : 1));
                setSortBy(sortValue);
                break;
            }
        }
    }

    return (
        <div className="sort-by-container">
            <h1>Sort By</h1>
            <select name="sort" id="sort-by" value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
                <option value="LOWEST">Numeric (lowest first)</option>
                <option value="HIGHEST">Numeric (highest first)</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div>
    );
}

export default PokemonCardsSort;
