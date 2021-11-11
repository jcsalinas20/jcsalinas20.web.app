import Particles from "react-tsparticles";
import particleOptions from "../json/particleOptions.json";
import Typed from 'react-typed';
import $ from "jquery";

import { Button, Transition } from "semantic-ui-react";
import { useState } from "react";

function Welcome() {
    const [visible, setVisible] = useState(true);

    function onClickViewMyProjects(e) {
        console.log("DEVELOPING ;)")
        setVisible(!visible);
        $(e.target).css({
            "animation": "normal 2s anim ease-out"
        });
        setTimeout(() => {
            setVisible(true)
            $(e.target).removeAttr("style");
        }, 2001);
    }

    return (
        <div className="welcome-page">
            <div className="background-particles">
                <Particles
                    id="tsparticles"
                    options={particleOptions}
                />
            </div>
            <p className="hello">Hello, I'm Juan Carlos👋</p>
            <Typed
                strings={[
                    'Full Stack Developer',
                    'Back End Developer',
                    'Front End Developer']}
                typeSpeed={80}
                backSpeed={100}
                backDelay={1500}
                className="text-typed"
                loop >
                <span></span>
            </Typed>
            <Button className="view-my-projects" content="View My Projects" primary onClick={onClickViewMyProjects}></Button>
        </div>
    );
};

export default Welcome;