import { useContext } from "react";
import { PokemonContext } from "../../App.jsx";
import Link from "../../BrowserRouter/Link.jsx";
import arrowBack from "../../assets/arrow-back.png";
import arrowForward from "../../assets/arrow-forward.png";

function PokemonInfoButtons({ currentPokemon }){
    const [pokemonList] = useContext(PokemonContext);
    const pokemonImg = document.querySelector(".pokemon-info-image img");
    const currentIndex = pokemonList.indexOf(currentPokemon);

    //Tarkistetaan onko listassa edellistä pokemonia
    const checkPrevPath = () => {
        if(currentIndex === 0){
            return currentPokemon.name;
        }
        return pokemonList[currentIndex-1].name;
    }

    //Tarkistetaan onko listassa seuraavaa pokemonia
    const checkNextPath = () => {
        if(currentIndex === 150){
            return currentPokemon.name;
        }
        return pokemonList[currentIndex+1].name;
    }

    //Kun pokemonin kuva vaihtuu sen näkyvyys nollaan (fade in efekti)
    const handlePokemonChange = () => {
        if(currentIndex !== 150 && currentIndex !== 0 && pokemonImg){
            pokemonImg.style.opacity = 0;
        }
    }

    const handleBackButton = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <Link to={"/"}>
                <p onClick={handleBackButton} id="pokemon-info-back">Back</p>
            </Link>
            <Link to={`/${checkPrevPath()}`}>
                <img 
                    id="pokemon-info-prev" 
                    src={arrowBack} 
                    alt="prev-pokemon" 
                    onClick={handlePokemonChange}
                />
            </Link>
            <Link to={`/${checkNextPath()}`}>
                <img 
                    id="pokemon-info-next" 
                    src={arrowForward} 
                    alt="next-pokemon" 
                    onClick={handlePokemonChange}
                />
            </Link>
        </>
    );
}

export default PokemonInfoButtons;
