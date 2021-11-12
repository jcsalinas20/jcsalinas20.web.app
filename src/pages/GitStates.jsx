import { Header, Segment, Icon } from 'semantic-ui-react';

function GitStates() {

    return (
        <div className="git-states">
            <Segment color="blue" className="github-card">
                <Header as='h1'>
                    <Icon name='github' inverted />
                    Git States (<a href="https://github.com/jcsalinas20">jcsalinas20</a>)
                </Header>
            </Segment>
        </div>
    );
}

export default GitStates;