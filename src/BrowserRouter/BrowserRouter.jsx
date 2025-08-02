import { createContext, useState, useEffect, useRef } from "react";
import PageNotFound from "../components/PageNotFound.jsx";

const BrowserContext = createContext();

function BrowserRouter({ children }){
    const [currentURL, setCurrentURL] = useState(new URL(window.location.href));
    const [pathCheck, setPathCheck] = useState(false);
    const pageFound = useRef(false);

    useEffect(() => {
        const handlePopStateEvent = (e) => {
            setCurrentURL(new URL(window.location.href));
        }
        window.addEventListener("popstate", handlePopStateEvent);

        setPathCheck(true);

        return () => window.removeEventListener("popstate", handlePopStateEvent);
    }, []);

    //Jos nykyinen url ei vastaa minkään routen polkua
    if(!pageFound.current && pathCheck){
        return (
            <PageNotFound />
        );
    }

    return (
        <BrowserContext.Provider value={{ pageFound, currentURL, setCurrentURL }}>
            {children}
        </BrowserContext.Provider>
    );
}

export default BrowserRouter;
export { BrowserContext };
