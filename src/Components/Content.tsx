import { useEffect } from "react";

function Content(props: any) {

    useEffect(() => {
        document.getElementById("content_id")?.scrollIntoView()
    }, []);

    const { contents, features, preserve, cult, prep } = props

    const { benefits } = JSON.parse(contents)
    const { Taste, Texture, Color, Common_Uses} = JSON.parse(features)
    const { how_to_choose, storage, shell_life } = JSON.parse(preserve)
    const { origin, cultural_uses } = JSON.parse(cult)
    const { how_to_prepare, common_pairings, cooking_methods } = JSON.parse(prep)

    return (
        <section id="content_id" className="content-ctn">

            {/* Benefits */}
            <div className="content-heading">
                <h2>health Benefits</h2>
            </div>
            <section className="content flex-column">
                {
                    benefits.map((value: { heading: string, paragraph: string }, index: number) => (
                        <p key={index} className="fs-heading"><span className="title-span">{value.heading} </span>: {value.paragraph}</p>
                    ))
                }
            </section>

            {/* Features */}
            <div className="content-heading">
                <h2>Features</h2>
            </div>
            <section className="content">
                <p className="fs-heading"><span className="title-span">Taste</span>: {Taste}</p>
                <p className="fs-heading"><span className="title-span">Texture</span>: {Texture}
                </p>
                <p className="fs-heading"><span className="title-span">Color</span>: {Color}</p>
                <p className="fs-heading"><span className="title-span">Common Uses</span>: {Common_Uses}</p>
            </section>

            {/* Preservation */}
            <div className="content-heading">
                <h2>Preservation</h2>
            </div>
            <section className="content">
                <p className="fs-heading"><span className="title-span">How To Choose</span>: {how_to_choose}</p>
                <p className="fs-heading"><span className="title-span">Storage</span>: {storage}
                </p>
                <p className="fs-heading"><span className="title-span">Color</span>: {Color}</p>
                <p className="fs-heading"><span className="title-span">Shell Life</span>: {shell_life}</p>
            </section>

            {/* Cultural and origin */}
            <div className="content-heading">
                <h2>Cultural or Historical Significance</h2>
            </div>
            <section className="content">
                <p className="fs-heading"><span className="title-span">Origin</span>: {origin}</p>
                <p className="fs-heading"><span className="title-span">Cultural Uses</span>: {cultural_uses}
                </p>
            </section>

            {/* Preparation */}
            <div className="content-heading">
                <h2>Preparation Tips</h2>
            </div>
            <section className="content">
                <p className="fs-heading"><span className="title-span">How To prepare</span>: {how_to_prepare}</p>
                <p className="fs-heading"><span className="title-span">Common Pairings</span>: {common_pairings}
                </p>
                <p className="fs-heading"><span className="title-span">Cooking Methods</span>: {cooking_methods}</p>
                <div className="recipegen">
                    <a href="http://recipegen-ai.netlify.app/" target="_blank">
                    <h2>Got a Recipe in Mind? Explore it with RecipeGen!</h2>
                    </a>
                    <div>
                        <img src="./RecipeGen.gif" alt="" />
                    </div>
                </div>
            </section>
        </section>
    );
}

export default Content;