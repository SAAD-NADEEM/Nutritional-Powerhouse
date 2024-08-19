import { useEffect } from "react";

function Loading() {

    useEffect(() => {
        document.getElementById("loadincircle")?.scrollIntoView()
    }, []);

    return (
       <section id="loadincircle" className="loading flex-row center">
            <img src="./loading.svg" alt="loading" />
       </section>
    );
}

export default Loading;