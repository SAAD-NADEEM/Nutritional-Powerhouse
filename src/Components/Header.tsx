
function Header() {

    const start = (id:string) => {
        document.getElementById(id)?.scrollIntoView()
    }

    return(
        <>
        <header className="flex-column center" >
            <section className="header-top flex-row center">
                <img src="./src/Images/title.svg" alt="Logo" />
                <div className="logo-ctn fs-heading">Nutritional Powerhouse</div>
            </section>
            <section className="header-bottom flex-row">
                <div className="sec-1 flex-row center">
                    {/* <div></div> */}
                    <img src="./src/Images/banner.png" alt="" />
                </div>
                <div className="sec-2 flex-column">
                    <h1 className="fs-paragraph">
                        Unleash the Full Potential <br /> of Every Bite.
                    </h1>  
                    <p className="fs-heading">
                        Nutritional Powerhouse delivers in-depth insights into the nutrients, benefits, and qualities of fruits and vegetables, empowering healthier choices
                    </p>
                    <div className="buttons flex-row">
                        <button onClick={() => start("inputArea")} className="button">Start</button>
                        <button className="button" onClick={() => start("about")} >About</button>
                    </div>
                </div>
            </section>
        </header>
        </>
    )
}

export default Header