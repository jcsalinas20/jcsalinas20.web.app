import React, { Component } from "react";

import Welcome from "./Welcome";
import AboutMe from "./AboutMe";

import "./_home.scss";

class Home extends Component {
    render() {
        return (
            <>
                <Welcome />
                <AboutMe />
            </>
        );
    }
}

export default Home;