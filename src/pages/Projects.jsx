import Particles from "react-tsparticles";
import linesParticlesOptions from "../json/linesParticlesOptions.json";
import { Header, Segment, Icon, Card, Image } from 'semantic-ui-react';

function Projects() {

    return (
        <div className="my-projects">
            <Header as='h1'>
                <Icon name='github' />
                My Projects
            </Header>
            <Segment color="blue" className="projects">
                <div className="background-particles">
                    <Particles
                        id="tsparticles2"
                        options={linesParticlesOptions}
                    />
                </div>
                <Card>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
                        </a>
                    </Card.Content>
                </Card>
            </Segment>
        </div>
    );
}

export default Projects;