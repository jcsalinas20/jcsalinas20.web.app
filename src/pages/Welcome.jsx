import Particles from "react-tsparticles";
import particleOptions from "../json/particleOptions.json";
import Typed from 'react-typed';
import $ from "jquery";

import { Button } from "semantic-ui-react";
import { useState } from "react";

function Welcome() {
    const [visible, setVisible] = useState(true);

    function onClickViewMyProjects(e) {
        document.getElementById("projects").scrollIntoView({top: 0, left: 0, behavior: 'smooth' });
        setVisible(!visible);
        $(e.target).css({
            "animation": "normal .4s hideMyProjectButton ease-out"
        });
        setTimeout(() => {
            setVisible(true)
            $(e.target).removeAttr("style");
        }, 501);
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