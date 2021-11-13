import { Header, Segment, Icon } from 'semantic-ui-react';

import Loading from "../components/Loading";

function GitStates() {

    return (
        <div className="git-states">
            <Segment color="blue" className="github-card">
                <Loading color="white" />
                <Header as='h1'>
                    <Icon name='github' inverted />
                    Git States (<a href="https://github.com/jcsalinas20">jcsalinas20</a>)
                </Header>
            </Segment>
        </div>
    );
}

export default GitStates;