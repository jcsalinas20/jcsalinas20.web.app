import Particles from "react-tsparticles";
import linesParticlesOptions from "../json/linesParticlesOptions.json";
import { Header, Segment, Icon } from 'semantic-ui-react';

import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

function Projects() {

    return (
        <div className="my-projects">
            <Header as='h1'>
                <Icon name='github' />
                My Projects
            </Header>
            <Segment color="blue" className="projects">
                <Loading color="white"/>
                <div className="background-particles">
                    <Particles
                        id="tsparticles2"
                        options={linesParticlesOptions}
                    />
                </div>
                <ProjectCard description="App for download tiktok videos" stars="5" topics={["Java", "JavaFX", "TikTok"]} />
                <ProjectCard description="App for download tiktok videos" stars="5" topics={["Java", "JavaFX", "TikTok"]} />
                <ProjectCard description="App for download tiktok videos" stars="5" topics={["Java", "JavaFX", "TikTok"]} />
            </Segment>
        </div>
    );
}

export default Projects;