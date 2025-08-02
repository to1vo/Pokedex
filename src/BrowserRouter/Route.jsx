import { useContext, Children, cloneElement, isValidElement } from "react";
import { BrowserContext } from "./BrowserRouter.jsx";

function Route({children, path}){
    const { currentURL, pageFound } = useContext(BrowserContext);

    const getPathId = (urlPath) => {
        //Otetaan id selville url osoitteesta
        let id = "";
        for(let i=urlPath.length-1; i>0;i--){
            if(urlPath[i] === "/") break;
            id += urlPath[i];
        }
        id = id.split("").reverse().join("");
        return id;
    }

    //Jos polku on täysin sama kuin routen
    if(currentURL.pathname === path){
        pageFound.current = true;
        return children;
    }

    //Jos routen polussa on ":" niin tarkastetaan polun yhteensopivuus
    //Sekä annetaan url:ssä oleva id kaikille routen sisällä oleville elementeille
    if(path.includes(":")){
        const id = getPathId(currentURL.pathname);
        const fullPathURL = currentURL.pathname.slice(0, -id.length);
        const fullPathRoute = path.slice(0, -3);

        if(fullPathRoute === fullPathURL){
            const childrenWithIdProp = Children.map(children, (child) => {
                if(!isValidElement(child)) return null;
                return cloneElement(child, {
                    ...child.props,
                    id: id
                })
            })
            pageFound.current = true;
            return childrenWithIdProp;
        }

    }

    return null;
}

export default Route;
