import { Image, Segment, Grid, Divider, Header, Icon } from "semantic-ui-react";

function AboutMe() {

    return (
        <div className="about-me">
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <Divider horizontal>
                            <Header as='h2'>
                                <Icon name='book' />
                                Skills
                            </Header>
                        </Divider>
                        <div className="skills-card">
                            <h3 className="subtitle-skills">
                                <Icon name="language" className="marginr" /> 
                                Languages
                                <div className="arrow-up left-side"></div>
                                <div className="arrow-up right-side"></div>
                            </h3>
                            <div>grupo de imagenes</div>
                            <h3 className="subtitle-skills">
                                <Icon name="connectdevelop" /> 
                                Frameworks
                                <div className="arrow-up left-side"></div>
                                <div className="arrow-up right-side"></div>
                            </h3>
                            <div>grupo de imagenes</div>
                            <h3 className="subtitle-skills">
                                <Icon name="database" /> 
                                Databases
                                <div className="arrow-up left-side"></div>
                                <div className="arrow-up right-side"></div>
                            </h3>
                            <div>grupo de imagenes</div>
                            <h3 className="subtitle-skills">
                                <Icon name="cog" /> 
                                Others
                                <div className="arrow-up left-side"></div>
                                <div className="arrow-up right-side"></div>
                            </h3>
                            <div>grupo de imagenes</div>
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <Divider horizontal>
                            <Header as='h3'>
                                <Icon name='address book' />
                                About Me
                            </Header>
                        </Divider>
                        <p>
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </p>
                        <p>
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </p>
                        <p>
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </p>
                        <p>
                            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        </p>
                    </Grid.Column>
                </Grid>

                <Divider vertical>and</Divider>
            </Segment>
        </div>
    );
}

export default AboutMe;