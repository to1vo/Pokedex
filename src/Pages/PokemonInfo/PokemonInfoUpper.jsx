import { useRef } from "react";

function PokemonInfoUpper({ pokemon }){    
    const imgRef = useRef(null);

    //Muuttujia avuksi ettei kaikki koodi ole jsx:ssä
    const pokemonTypes = pokemon.types.map(type => type.type.name.charAt(0).toUpperCase()+type.type.name.slice(1));
    const pokemonName = pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1);
    const pokemonHeight = (pokemon.height/10).toFixed(1);
    const pokemonWeight = (pokemon.weight/10).toFixed(1);
    const pokemonImg = pokemon.sprites.other["official-artwork"].front_default;
    
    //Sivun taustaväriksi pokemon tyypin mukainen väri
    if(pokemonTypes.length == 2){
        document.querySelector("#root").style.background = `linear-gradient(130deg, var(--${pokemonTypes[1].toLowerCase()}), var(--${pokemonTypes[0].toLowerCase()}))`;
    } else {
        document.querySelector("#root").style.background = `linear-gradient(130deg, var(--card-second-color), var(--${pokemonTypes[0].toLowerCase()}))`;
    }

    //Kun pokemonin kuva latautuu se tulee näkyville (fade in efekti)
    //Paitsi jos kuva on jo kerran ladattu...
    const handleImgLoad = () => {
        const img = imgRef.current;
        img.style.opacity = 1;
    }

    return (
        <div className="pokemon-info-upper">
            <div className="pokemon-info">
                <div id="pokemon-info-types">
                    {pokemonTypes.map(type => <div key={type}>{type}</div>)}
                </div>
                <h1>{pokemonName}</h1>
                <div id="pokemon-more-info">
                    <div>
                        <p>Height</p>
                        <p>{pokemonHeight}M</p>
                    </div>
                    <div>
                        <p>Weight</p>
                        <p>{pokemonWeight}KG</p>
                    </div>
                </div>
            </div>
            <div className="pokemon-info-image">
                <img 
                    ref={imgRef}
                    src={pokemonImg}
                    alt="pokemon-img" 
                    onLoad={handleImgLoad}
                    style={{opacity: 0}}
                />
            </div>
        </div>
    );
}

export default PokemonInfoUpper;
