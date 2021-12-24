import React, { useEffect, useState } from "react";
import { Header, Segment, Icon, Image, List, Popup, Button } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchStats } from 'github-contribution-stats';

import Loading from "../components/Loading";
import TargetProfile from "../components/TargetProfile";

function GitStates() {
    const [user, setUser] = useState({});
    const [orgs, setOrgs] = useState([]);
    const [pieProps, setPieProps] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });
    const colorsLang = {
        Java: { color: "#ff9f405e", border: "#ff9f40" },
        "C++": { color: "#f34b7d5e", border: "#f34b7d" },
        HTML: { color: "#d15b2a5e", border: "#d15b2a" },
        JavaScript: { color: "#feda3d5e", border: "#feda3d" },
        PHP: { color: "#617cbe5e", border: "#617cbe" },
        CSS: { color: "#563d7c5e", border: "#563d7c" },
        Blade: { color: "#f7523f5e", border: "#f7523f" },
        Shell: { color: "#89e0515e", border: "#89e051" },
        SCSS: { color: "#c6538c5e", border: "#c6538c" },
        Batchfile: { color: "#c1f12e5e", border: "#c1f12e" },
        Python: { color: "#3572a55e", border: "#3572a5" },
        Hack: { color: "#8787875e", border: "#878787" },
        C: { color: "#5555555e", border: "#555555" },
        Default: { color: "#ededed52", border: "#ededed" }
    }
    ChartJS.register(ArcElement, Tooltip, Legend);


    fetchStats('jcsalinas20').then(stats => console.log(stats));

    useEffect(() => {
        async function fetchData() {
            setUser(await fetch(`${process.env.REACT_APP_API_DOMAIN}/user/get`)
                .then((res) => res.json())
                .then((json) => { return json.user }));

            setOrgs(await fetch(`${process.env.REACT_APP_API_DOMAIN}/orgs/get`)
                .then((res) => res.json())
                .then((json) => { return json.orgs }));
        }
        fetchData();
    }, []);

    useEffect(() => {
        let names = [];
        let lines = []
        let colors = [];
        let borders = [];
        if (user.languages) {
            for (const item of user.languages) {
                names.push(item.name);
                lines.push(item.lines);
                if (colorsLang[item.name]) {
                    colors.push(colorsLang[item.name].color);
                    borders.push(colorsLang[item.name].border);
                } else {
                    colors.push(colorsLang.Default.color);
                    borders.push(colorsLang.Default.border);
                }
            }
        }
        setPieProps({
            labels: names,
            datasets: [
                {
                    label: '# of Votes',
                    data: lines,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 1,
                },
            ],
        });
    }, [user])

    return (
        <div className="git-states">
            <Segment color="blue" className="github-card">
                {(!user.username) ? <Loading color="white" /> : ""}
                <Header as='h1'>
                    <Icon name='github' inverted />
                    Git States (<TargetProfile data={user} />)
                </Header>
                <Segment.Group horizontal raised className="main-data">
                    <Segment className="data image">
                        <Image src={user.avatar} size="small" circular />
                        {user.name}
                    </Segment>
                    <Segment className="data">
                        <Icon name="user" size="small" color="blue" />
                        {"Followers: " + user.followers}
                    </Segment>
                    <Segment className="data">
                        <Icon name="box" size="small" color="brown" />
                        {"Repositories: " + user.public_repos}
                    </Segment>
                    <Segment className="data">
                        <Icon name="users" size="small" color="green" />
                        {"Collaborations: " + user.collaborations}
                    </Segment>
                    <Segment className="data">
                        <Icon name="star" size="small" color="yellow" />
                        {"Stars: " + user.stars}
                    </Segment>
                </Segment.Group>
                <Segment.Group horizontal raised className="other-data">
                    <div className="container-arrow left">
                        <Button secondary icon>
                            <Icon size="big" name="arrow alternate circle left outline" />
                        </Button>
                    </div>
                    <Segment>
                        <Header as="h2" className="title">Organizations</Header>
                        <List>
                            {orgs.map((org, index) => {
                                return (
                                    <List.Item key={index}>
                                        <Popup flowing hoverable trigger={<Image src={org.avatar} size="mini" rounded />} content={org.username} />
                                        <List.Content>
                                            <List.Header as='label'>{org.name}</List.Header>
                                            <List.Description as='label'>{org.description}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                );
                            })}
                        </List>
                    </Segment>
                    <Segment>
                        <Header as="h2" className="title">Languages</Header>
                        <div className="pie-container">
                            {(pieProps) ? <Pie data={pieProps} /> : "Loading"}
                        </div>
                    </Segment>
                    <div className="container-arrow right">
                        <Button secondary icon>
                            <Icon size="big" name="arrow alternate circle right outline" />
                        </Button>
                    </div>
                </Segment.Group>


                <Segment.Group horizontal raised className="other-da">
                    <div className="container-arrow left">
                        <Button secondary icon>
                            <Icon size="big" name="arrow alternate circle left outline" />
                        </Button>
                    </div>
                    <Segment>
                        <Header as="h2" className="title">Organizations</Header>
                        <Segment className="child">
                            {/* <iframe src="https://github.com/users/jcsalinas20/contributions?to=2020-12-31"></iframe> */}
                        </Segment>
                        <Segment className="child">
                            <Header as="h2" className="title">Languages</Header>
                            <div className="pie-container">
                                {(pieProps) ? <Pie data={pieProps} /> : "Loading"}
                            </div>
                        </Segment>
                    </Segment>
                    <div className="container-arrow right">
                        <Button secondary icon>
                            <Icon size="big" name="arrow alternate circle right outline" />
                        </Button>
                    </div>
                </Segment.Group>
            </Segment>
        </div>
    );
}

export default GitStates;