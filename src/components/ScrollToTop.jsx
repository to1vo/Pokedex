import { useEffect, useState } from "react";
import ArrowUpImg from "../assets/arrow-up.png";

function ScrollToTop(){
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            if(window.scrollY > 0){
                setScrolling(true);
                return;
            }
            setScrolling(false);
        }
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }, 350);
    }

    if(scrolling){
        return (
            <div onClick={scrollToTop} id="back-to-top-container">
                <p>Back to top</p>
                <img src={ArrowUpImg} alt="arrow-up" />
            </div>
        );
    }
}

export default ScrollToTop;
