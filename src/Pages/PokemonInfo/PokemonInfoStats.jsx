function PokemonInfoStats({ pokemon }){
    const pokemonStats = pokemon.stats;

    return (
        <div className="pokemon-stats-container">
            <h1>Stats</h1>
            <div id="pokemon-stats">
                {pokemonStats.map(currentStat => {
                    //Tarkistetaan jos statsin nimessä on viiva
                    //Jolloin pitää myös toisen sanan ensimmäinen kirjain muokata isoksi
                    //Voi varmaan tehdä järkevämminkin?:D
                    let statName;
                    if(currentStat.stat.name.includes("-")){
                        statName = currentStat.stat.name[0].toUpperCase()+currentStat.stat.name.slice(1).replace("-", " ");
                        statName = statName.slice(0, statName.indexOf(" ")+1)+statName[statName.indexOf(" ")+1].toUpperCase()+statName.slice(statName.indexOf(" ")+2);
                    } else {
                        statName = currentStat.stat.name[0].toUpperCase()+currentStat.stat.name.slice(1)
                    }

                    return (
                        <div className="stat-container" key={currentStat.stat.name}>
                            <p className="stat-name">{statName}</p>
                            <div className="stat-slider-container">
                            <div className="stat-slider" style={{width: `${currentStat.base_stat/2.5}%`}}></div>
                            </div>
                            <p>{currentStat.base_stat}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PokemonInfoStats;