import pokedexLogo from "../assets/pokedex-logo.png";

function Header(){
    return (
        <div className="header">
            <img src={pokedexLogo} alt="pokedex-logo" />
        </div>
    );
}

export default Header;