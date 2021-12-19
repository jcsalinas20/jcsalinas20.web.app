import React, { useEffect, useState } from "react";
import { Header, Segment, Icon } from 'semantic-ui-react';

import Loading from "../components/Loading";
import TargetProfile from "../components/TargetProfile";

function GitStates() {
    const [user, setUser] = useState({});
    // const [loading, setLoading] = useState(true);

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
            </Segment>
        </div>
    );
}

export default GitStates;