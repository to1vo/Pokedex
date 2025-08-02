import { useRef } from "react";
import PikachuGif from "../assets/pikachu-running.gif";

function Loading(){
    const imgRef = useRef(null);

    //Luodaan fade in efekti kun kuva (gif) on ladattu
    const handleImageLoad = () => {
      const img = imgRef.current;
      img.style.opacity = 1;
    }

    return (
        <div className="loading-container">
          <div id="loading-image-container">
            <img 
              ref={imgRef}
              onLoad={handleImageLoad}
              src={PikachuGif} 
              alt="pikachu-running" 
              style={{opacity: 0}}
            />
          </div>
          <h2>Loading Pokémon...</h2>
          <h4>This may take a little bit more time on first time you load the page</h4>
        </div>
    );
}

export default Loading;