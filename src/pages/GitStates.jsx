import React, { useEffect, useState } from "react";
import { Header, Segment, Icon, Image, List, Popup, Button } from 'semantic-ui-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';

import Loading from "../components/Loading";
import Card503 from "../components/Card503";
import TargetProfile from "../components/TargetProfile";

function GitStates() {
    const [semaforCarousel, setSemaforCarousel] = useState(true);
    const [user, setUser] = useState({});
    const [orgs, setOrgs] = useState([]);
    const [svg2020, setSvg2020] = useState("");
    const [svg2021, setSvg2021] = useState("");
    const [svg2022, setSvg2022] = useState("");
    const [error503, setError503] = useState(false);
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
    ChartJS.register(ArcElement, Tooltip, Legend);
    
    useEffect(() => {
        async function fetchData() {
            setUser(await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.status) {
                        setError503(true);
                        return {};
                    }
                    return json.user;
                }));
            if (!error503) {
                setOrgs(await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/orgs`)
                    .then((res) => res.json())
                    .then((json) => { return json.orgs }));
                await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/stats`)
                    .then(res => res.json())
                    .then((json) => {
                        setSvg2020(json.svg[2020]);
                        setSvg2021(json.svg[2021]); 
                        setSvg2022(json.svg[2022]);
                    });
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let names = [];
        let sizes = []
        let colors = [];
        let borders = [];
        if (user.languages) {
            for (const item of user.languages) {
                names.push(item.name);
                sizes.push(item.size);
                colors.push(item.color + "5e");
                borders.push(item.color);
            }
        }
        setPieProps({
            labels: names,
            datasets: [
                {
                    label: '# of Votes',
                    data: sizes,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 1,
                },
            ],
        });
    }, [user]);

    return (
        <div className="git-states">
            {(user.username) ?
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
                            {"Repositories: " + user.repos.public}
                        </Segment>
                        <Segment className="data">
                            <Icon name="users" size="small" color="green" />
                            {"Collaborations: " + user.collabs.public}
                        </Segment>
                        <Segment className="data">
                            <Icon name="star" size="small" color="yellow" />
                            {"Stars: " + user.stars.public}
                        </Segment>
                    </Segment.Group>
                    {(semaforCarousel) ?
                        <Segment.Group horizontal raised className="other-data">
                            <Segment className="left-seg">
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
                            <Segment className="right-seg">
                                <Header as="h2" className="title">Languages</Header>
                                <div className="pie-container">
                                    {(pieProps) ? <Pie data={pieProps} /> : "Loading"}
                                </div>
                            </Segment>
                            <div className="container-arrow right" onClick={() => { setSemaforCarousel(!semaforCarousel) }}>
                                <Button secondary icon>
                                    <Icon size="big" name="arrow alternate circle right outline" />
                                </Button>
                            </div>
                        </Segment.Group>
                        :
                        <Segment.Group horizontal raised className="other-data-part2">
                            <div className="container-arrow left" onClick={() => { setSemaforCarousel(!semaforCarousel) }}>
                                <Button secondary icon>
                                    <Icon size="big" name="arrow alternate circle left outline" />
                                </Button>
                            </div>
                            <Segment className="single-seg">
                                <Header as="h2" className="title">Stats</Header>
                                <Segment className="child-contributions">
                                    <Header as='h3' className="subtitle">
                                        <Icon name="calendar alternate outline" />Year: 2022
                                    </Header>
                                    <GitHubCalendar className="contributions" username="jcsalinas20" year={2022} >
                                        <ReactTooltip html />
                                    </GitHubCalendar>
                                    <div className="stats" dangerouslySetInnerHTML={{ __html: svg2022 }}></div>
                                    <hr />
                                    <Header as='h3' className="subtitle">
                                        <Icon name="calendar alternate outline" />Year: 2021
                                    </Header>
                                    <GitHubCalendar className="contributions" username="jcsalinas20" year={2021} >
                                        <ReactTooltip html />
                                    </GitHubCalendar>
                                    <div className="stats" dangerouslySetInnerHTML={{ __html: svg2021 }}></div>
                                    <hr />
                                    <Header as='h3' className="subtitle">
                                        <Icon name="calendar alternate outline" />Year: 2020
                                    </Header>
                                    <GitHubCalendar className="contributions" username="jcsalinas20" year={2020} >
                                        <ReactTooltip html />
                                    </GitHubCalendar>
                                    <div className="stats" dangerouslySetInnerHTML={{ __html: svg2020 }}></div>
                                </Segment>
                            </Segment>
                        </Segment.Group>
                    }
                </Segment>
                : ""}
        </div>
    );
}

export default GitStates;