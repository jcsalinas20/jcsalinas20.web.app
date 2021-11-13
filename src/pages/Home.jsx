import React, { Component } from "react";

import Welcome from "./Welcome";
import AboutMe from "./AboutMe";
import GitStates from "./GitStates";
import Projects from "./Projects";

import "./_home.scss";

class Home extends Component {
    render() {
        return (
            <>
                <Welcome />
                <AboutMe />
                <GitStates />
                <Projects />
            </>
        );
    }
}

export default Home;