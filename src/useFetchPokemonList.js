import { useEffect, useState } from "react";

function useFetchPokemonList(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    //Tarvittavat muuttujat
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const apiCalls = new Set();

    //Luodaan 152 fetch lausetta ja tallennetaan ne apiCalls listaan
    for(let id=1; id<152; id++){
        apiCalls.add(fetch(`${apiUrl}${id}/`));
    }
    
    useEffect(() => {
        try {
            //Käydään läpi kaikki fetch lauseet samaan aikaan jotta 
            //Saadaan data mahdollisimman nopeasti
            Promise.all(apiCalls)
                .then((responses) => {
                    Promise.all(responses.map((response) => {
                        //Tarkistetaan response status
                        if(!response.ok) setError(true);
                        return response.clone().json();
                    }))
                    .then((data) => {
                        setData(data);
                        setLoading(false);
                    });
                })
        } catch(err){
            console.error("Failed to fetch!");
            console.error(err);
            setError(true);
        }
    }, []);

    return { data, loading, error };
}

export default useFetchPokemonList;
