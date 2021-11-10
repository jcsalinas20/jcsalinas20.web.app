import React, { Component } from "react";

import Loading from "../components/Loading";
import Welcome from "../components/Welcome";

class Home extends Component {
    render() {
        return (
            <>
                {/* <Loading /> */}
                <Welcome />
                { /* <div>
                    <p>fondo de estrellas(si puede ser algun efecto del raton)</p>
                    <p>Presentacion ...</p>
                    <p>boton para ir directamente a los proyectos</p>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <p>My Skills</p>
                    <p>About Me</p>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <p>Git Stats</p>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <p>My Projects</p>
                    <p>Collaborations</p>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <p>Contact With Me</p>
                </div> */ }
            </>
        );
    }
}

export default Home;