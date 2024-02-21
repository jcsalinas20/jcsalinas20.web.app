import React, { useEffect, useState } from "react";
import { Header, Segment, Icon, Image, List, Popup, Button, Placeholder, Loader } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import GitHubCalendar from "react-github-calendar";
import ReactTooltip from "react-tooltip";
import moment from "moment";

import Loading from "../components/Loading";
import Card503 from "../components/Card503";
import TargetProfile from "../components/TargetProfile";

function GitStates() {
  const [semaforCarousel, setSemaforCarousel] = useState(true);
  const [user, setUser] = useState({});
  const [orgs, setOrgs] = useState([]);
  const [yearsSvg, setYearsSvg] = useState({});
  // const [svg2020, setSvg2020] = useState("");
  // const [svg2021, setSvg2021] = useState("");
  // const [svg2022, setSvg2022] = useState("");
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
      setUser(
        await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}`, {
          headers: { Authorization: `${process.env.REACT_APP_JWT_API}` },
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status) {
              setError503(true);
              return {};
            }
            return json.user;
          }),
      );
      if (!error503) {
        setOrgs(
          await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/orgs`, {
            headers: { Authorization: `${process.env.REACT_APP_JWT_API}` },
          })
            .then((res) => res.json())
            .then((json) => {
              return json.orgs;
            }),
        );
        await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/stats`, {
          headers: { Authorization: `${process.env.REACT_APP_JWT_API}` },
        })
          .then((res) => res.json())
          .then((json) => {
            setYearsSvg(json.svg);
          });
      }
    }

    const startYear = 2020;
    const endYear = moment().year();

    for (var year = startYear; year <= endYear; year++) {
      yearsSvg[year] = "";
    }

    fetchData();
  }, []);

  useEffect(() => {
    let names = [];
    let sizes = [];
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
          label: "# of Votes",
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
      <Segment color="blue" className="github-card">
        <Header as="h1">
          <Icon name="github" inverted />
          Git States (
          {!user.username ? (
            <Placeholder style={{ width: "100px", height: "38px" }}>
              <Placeholder.Line length="full" style={{ height: "auto" }} />
            </Placeholder>
          ) : (
            <TargetProfile data={user} />
          )}
          )
        </Header>
        <Segment.Group horizontal raised className="main-data">
          {!user.username ? (
            <>
              <Segment className="data image">
                <Placeholder style={{ borderRadius: "500rem" }}>
                  <Placeholder.Image square style={{ width: "150px", borderRadius: "500rem" }} />
                </Placeholder>
              </Segment>
              <Segment className="data">
                <Icon name="user" size="small" color="blue" />
                {"Followers: "} <Loader active style={{ right: "0", left: "auto" }} />
              </Segment>
              <Segment className="data">
                <Icon name="box" size="small" color="brown" />
                {"Repositories: "} <Loader active style={{ right: "0", left: "auto" }} />
              </Segment>
              <Segment className="data">
                <Icon name="users" size="small" color="green" />
                {"Collaborations: "} <Loader active style={{ right: "0", left: "auto" }} />
              </Segment>
              <Segment className="data">
                <Icon name="star" size="small" color="yellow" />
                {"Stars: "} <Loader active style={{ right: "0", left: "auto" }} />
              </Segment>
            </>
          ) : (
            <>
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
            </>
          )}
        </Segment.Group>
        {semaforCarousel ? (
          <Segment.Group horizontal raised className="other-data">
            <Segment className="left-seg">
              <Header as="h2" className="title">
                Organizations
              </Header>
              <List>
                {orgs.length === 0 ? (
                  <>
                    <List.Item key={0}>
                      <List.Content style={{ height: "28px" }}>
                        <Loader active style={{ position: "relative" }} />
                      </List.Content>
                    </List.Item>
                    <List.Item key={1}>
                      <List.Content style={{ height: "28px" }}>
                        <Loader active style={{ position: "relative" }} />
                      </List.Content>
                    </List.Item>
                    <List.Item key={2}>
                      <List.Content style={{ height: "28px" }}>
                        <Loader active style={{ position: "relative" }} />
                      </List.Content>
                    </List.Item>
                  </>
                ) : (
                  orgs.map((org, index) => {
                    return (
                      <List.Item key={index}>
                        <Popup flowing hoverable trigger={<Image src={org.avatar} size="mini" rounded />} content={org.username} />
                        <List.Content>
                          <List.Header as="label">{org.name}</List.Header>
                          <List.Description as="label">{org.description}</List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })
                )}
              </List>
            </Segment>
            <Segment className="right-seg">
              <Header as="h2" className="title">
                Languages
              </Header>
              <div className="pie-container">
                {pieProps.labels.length === 0 ? (
                  <>
                    <Placeholder style={{ backgroundImage: "linear-gradient(to right,rgb(0 0 0 / 19%) 0,rgb(0 0 0) 15%,rgb(0 0 0) 30%)" }}>
                      <Placeholder.Line style={{ backgroundColor: "#1a1f26" }} />
                      <Placeholder.Line style={{ backgroundColor: "#1a1f26" }} />
                      <Placeholder.Line style={{ backgroundColor: "#1a1f26" }} />
                    </Placeholder>
                    <Placeholder className="pie-loading">
                      <Placeholder.Line length="full" style={{ height: "auto" }} />
                    </Placeholder>
                  </>
                ) : (
                  <Pie data={pieProps} />
                )}
              </div>
            </Segment>
            <div
              className="container-arrow right"
              onClick={() => {
                setSemaforCarousel(!semaforCarousel);
              }}
            >
              <Button secondary icon>
                <Icon size="big" name="arrow alternate circle right outline" />
              </Button>
            </div>
          </Segment.Group>
        ) : (
          <Segment.Group horizontal raised className="other-data-part2">
            <div
              className="container-arrow left"
              onClick={() => {
                setSemaforCarousel(!semaforCarousel);
              }}
            >
              <Button secondary icon>
                <Icon size="big" name="arrow alternate circle left outline" />
              </Button>
            </div>
            <Segment className="single-seg">
              <Header as="h2" className="title">
                Stats
              </Header>
              <Segment className="child-contributions">
                {Object.keys(yearsSvg).map((year, i) => {
                  return (
                    <>
                      <Header as="h3" className="subtitle">
                        <Icon name="calendar alternate outline" />
                        Year: {year}
                      </Header>
                      <GitHubCalendar className="contributions" username="jcsalinas20" year={year}>
                        <ReactTooltip html />
                      </GitHubCalendar>
                      {yearsSvg[year] ? (
                        <div className="stats" dangerouslySetInnerHTML={{ __html: yearsSvg[year] }}></div>
                      ) : (
                        <div className="stats">
                          <Placeholder style={{ width: "381px", height: "175px", margin: "15px 0", borderRadius: "10px" }}>
                            <Placeholder.Image rectangular active />
                          </Placeholder>
                        </div>
                      )}
                    </>
                  );
                })}
                {/* <GitHubCalendar className="contributions" username="jcsalinas20" year={2022} >
                                    <ReactTooltip html />
                                </GitHubCalendar>
                                {(svg2022) ? <div className="stats" dangerouslySetInnerHTML={{ __html: svg2022 }}></div>
                                :
                                <div className="stats">
                                    <Placeholder style={{width: "381px", height: "175px", margin: "15px 0", borderRadius: "10px"}}>
                                        <Placeholder.Image rectangular active />
                                    </Placeholder>
                                </div>
                                } */}
                {/*<Header as='h3' className="subtitle">
                                    <Icon name="calendar alternate outline" />Year: 2022
                                </Header>
                                <GitHubCalendar className="contributions" username="jcsalinas20" year={2022} >
                                    <ReactTooltip html />
                                </GitHubCalendar>
                                {(svg2022) ? <div className="stats" dangerouslySetInnerHTML={{ __html: svg2022 }}></div>
                                :
                                <div className="stats">
                                    <Placeholder style={{width: "381px", height: "175px", margin: "15px 0", borderRadius: "10px"}}>
                                        <Placeholder.Image rectangular active />
                                    </Placeholder>
                                </div>
                                }
                                <hr />
                                <Header as='h3' className="subtitle">
                                    <Icon name="calendar alternate outline" />Year: 2021
                                </Header>
                                <GitHubCalendar className="contributions" username="jcsalinas20" year={2021} >
                                    <ReactTooltip html />
                                </GitHubCalendar>
                                {(svg2021) ? <div className="stats" dangerouslySetInnerHTML={{ __html: svg2021 }}></div>
                                :
                                <div className="stats">
                                    <Placeholder style={{width: "381px", height: "175px", margin: "15px 0", borderRadius: "10px"}}>
                                        <Placeholder.Image rectangular active />
                                    </Placeholder>
                                </div>
                                }
                                <hr />
                                <Header as='h3' className="subtitle">
                                    <Icon name="calendar alternate outline" />Year: 2020
                                </Header>
                                <GitHubCalendar className="contributions" username="jcsalinas20" year={2020} >
                                    <ReactTooltip html />
                                </GitHubCalendar>
                                {(svg2020) ? <div className="stats" dangerouslySetInnerHTML={{ __html: svg2020 }}></div>
                                :
                                <div className="stats">
                                    <Placeholder style={{width: "381px", height: "175px", margin: "15px 0", borderRadius: "10px"}}>
                                        <Placeholder.Image rectangular active />
                                    </Placeholder>
                                </div>
                                }*/}
              </Segment>
            </Segment>
          </Segment.Group>
        )}
      </Segment>
    </div>
  );
}

export default GitStates;
