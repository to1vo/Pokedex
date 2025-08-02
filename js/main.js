// Toivo Lindholm 2023
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokemonCount = 152;
let pokedex = {};

// Elements //
//Info
const pokemonInfo = document.querySelector(".pokemon-info");
const pokemonInfoImg = document.querySelector(".pokemon-info-img img");
const pokemonInfoName = document.querySelector(".pokemon-info-name");
const pokemonInfoNum = document.querySelector("#pokemon-info-num")
const pokemonInfoTypes = document.querySelector(".pokemon-info-types");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");


const pokemonList = document.querySelector(".pokemon-list");
const pokedexBigLight = document.querySelector("#pokedex-big-light");

//Stats
const hpStats = document.querySelector("#hp");
const atkStats = document.querySelector("#atk");
const defStats = document.querySelector("#def");
const spdStats = document.querySelector("#spd");



//Kun sivu ladataan 151 pokemonia haetaan
window.onload = async function(){
    for(let i=1;i < pokemonCount;i++){
        //Haetaan 151 pokemonia
        await getPokemon(i);
        
        // Lisätään pokemonit pokemon listaan
        //div
        let pokemon = document.createElement("div");
        pokemon.classList.add("pokemon-list-item");
        pokemon.id = i;
        //img
        let pokemonImg = document.createElement("img");
        pokemonImg.src = pokedex[i].img;
        //p
        let pokemonNum = document.createElement("p");
        if(pokedex[i].number < 10){
            pokemonNum.innerText = "#00"+pokedex[i].number;
        } else if(pokedex[i].number < 100){
            pokemonNum.innerText = "#0"+pokedex[i].number;
        } else {
            pokemonNum.innerText = "#"+pokedex[i].number;
        }
        pokemonNum.classList.add("pokemon-number");
        let pokemonName = document.createElement("p");
        pokemonName.innerText = pokedex[i].name;
        pokemonName.classList.add("pokemon-name");
        
        //Lisätään tiedot pokemon listaan
        pokemon.appendChild(pokemonNum);
        pokemon.appendChild(pokemonImg);
        pokemon.appendChild(pokemonName);
        pokemonList.appendChild(pokemon);

        //Kun tietystä pokemonista painetaan
        pokemon.addEventListener("click", (e)=> {
            //Pokemonin numeron avulla tiedot tulevat näkyviin
            getPokemonInfo(i);
            pokedexBigLight.style.backgroundColor = "rgb(189, 199, 253)";
            setTimeout(()=> {
                pokedexBigLight.style.backgroundColor = "rgb(74, 107, 253)";
            }, 125);
        });
    }
}

//Yksittäinen pokemon haetaan
async function getPokemon(num){
    const response = await fetch(apiUrl + num.toString())
    
    const data = await response.json();
    let pokemonName = data.name;
    let pokemonType = data.types;
    let pokemonHeight = data.height/10;
    let pokemonWeight = data.weight/10;
    let pokemonNum = num;
    let pokemonImg = data.sprites.front_default;
    let pokemonStats = data.stats;
    
    //Tallennetaan pokemon pokedex objektiin
    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "height" : pokemonHeight, "weight" : pokemonWeight, "number" : pokemonNum, "stats" : pokemonStats}
}

function getPokemonInfo(num){
    pokemonInfoTypes.innerHTML = "";
    //Valitun pokemonin tiedot lisätään info puolelle
    pokemonInfoImg.src = pokedex[num].img;
    pokemonInfoName.innerText = pokedex[num].name;
    if(pokedex[num].number < 10){
        pokemonInfoNum.innerText = "#00"+pokedex[num].number;
    } else if(pokedex[num].number < 100){
        pokemonInfoNum.innerText = "#0"+pokedex[num].number;
    } else {
        pokemonInfoNum.innerText = "#"+pokedex[num].number;
    }

    //Pokemonin tyyppi
    pokedex[num].types.forEach(typeObj => {
        let typeDiv = document.createElement("div");
        typeDiv.classList.add("pokemon-type");
        typeDiv.id = typeObj.type.name;
        typeDiv.innerText = typeObj.type.name;
        //Lisätään luotu elementti info diviin
        pokemonInfoTypes.appendChild(typeDiv);
    });
    weight.innerText = "Weight:"+pokedex[num].weight+"kg";
    height.innerText = "Height:"+pokedex[num].height+"m";

    //Statsit
    hpStats.innerText = "HP: "+pokedex[num].stats[0].base_stat;
    atkStats.innerText = "ATK: "+pokedex[num].stats[1].base_stat;
    defStats.innerText = "DEF: "+pokedex[num].stats[2].base_stat;
    spdStats.innerText = "SPD: "+pokedex[num].stats[5].base_stat;
}
