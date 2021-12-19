import React, { useEffect, useState } from "react";
import { Header, Segment, Icon, Image } from 'semantic-ui-react';

import Loading from "../components/Loading";
import TargetProfile from "../components/TargetProfile";

function GitStates() {
    const [user, setUser] = useState({});

    useEffect(async () => {
        setUser(await fetch("http://localhost:1337/api/git/user/get")
            .then((res) => res.json())
            .then((json) => { return json.user }));
    }, []);

    return (
        <div className="git-states">
            <Segment color="blue" className="github-card">
                {(!user.username) ? <Loading color="white" /> : ""}
                <Header as='h1'>
                    <Icon name='github' inverted />
                    Git States (<TargetProfile data={user} />)
                </Header>
                <Segment.Group horizontal raised className="main-data">
                    <Segment className="data"><Image src={user.avatar} size="small" circular />{user.name}</Segment>
                    <Segment className="data">{"Followers: " + user.followers}</Segment>
                    <Segment className="data">{"Repositories: " + user.public_repos}</Segment>
                    <Segment className="data">{"Collaborations: X"}</Segment>
                    <Segment className="data">{"Stars: X"}</Segment>
                </Segment.Group>
                <Segment.Group horizontal raised>
                    <Segment><Header as="h2">Organizations</Header></Segment>
                    <Segment><Header as="h2">Languajes</Header></Segment>
                </Segment.Group>
            </Segment>
        </div>
    );
}

export default GitStates;