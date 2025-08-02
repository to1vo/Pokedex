import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Link from "../../BrowserRouter/Link.jsx"

function PokemonCard({ pokemon }){
    let pokemonCardStyle;
    const pokemonTypes = pokemon.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1));

    //Pokemon kortin taustaväri riipppuu pokemon tyypistä
    if(pokemonTypes.length == 2){
        pokemonCardStyle = `linear-gradient(130deg, var(--${pokemonTypes[1].toLowerCase()}), var(--${pokemonTypes[0].toLowerCase()}))`;
    } else {
        pokemonCardStyle = `linear-gradient(130deg, var(--card-second-color), var(--${pokemonTypes[0].toLowerCase()}))`;
    }

    const handleCardClick = () => {
        window.scrollTo(0, 0);
    }

    return (
        <Link to={`/${pokemon.name}`}>
            <div className="pokemon-card-outer">
                <div 
                    onClick={handleCardClick} 
                    key={pokemon.id} 
                    className="pokemon-card" 
                    style={{
                        background: pokemonCardStyle
                    }}
                >
                    <div className="pokemon-card-img-container">
                        <LazyLoadImage 
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt="pokemon-img"
                            loading="lazy"
                            effect="opacity"
                        />
                    </div>
                    <p id="pokemon-number">#{(pokemon.id/100).toFixed(2).toString().replace(".", "")}</p>
                    <h2>{pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)}</h2>
                    <div className="pokemon-types">
                        <div style={{backgroundColor: `var(--${pokemonTypes[0].toLowerCase()})`}}>{pokemonTypes[0]}</div>
                        {pokemonTypes.length == 2 && <div style={{backgroundColor: `var(--${pokemonTypes[1].toLowerCase()})`}}>{pokemonTypes[1]}</div>}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PokemonCard;
