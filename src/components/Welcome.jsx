import Particles from "react-tsparticles";
import particleOptions from "./particleOptions.json";
import Typed from 'react-typed';

import "./_welcome.scss";

function Welcome() {

    const particlesInit = (main) => {
        console.log(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <div className="welcome-page">
            <div className="background-particles">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    loaded={particlesLoaded}
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
        </div>
    );
};

export default Welcome;