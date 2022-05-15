import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import linesParticlesOptions from "../json/linesParticlesOptions.json";
import { Header, Segment, Icon, Input, Dropdown } from 'semantic-ui-react';

import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [filter, setFilter] = useState([]);
    const [basicRepos, setBasicRepos] = useState([]);
    const [searcher, setSearcher] = useState([]);
    const [selectedFilterType, setSelectedFilterType] = useState("");
    const [error503, setError503] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setBasicRepos(await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/repos/basic`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.status) {
                        setError503(true);
                        return {};
                    }
                    setSearcher(json.repos);
                    return json.repos;
                })
            );
            if (!error503) {
                setRepos(await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/repos`)
                    .then((res) => res.json())
                    .then((json) => {
                        for (const repo of json.repos) {
                            for (const lang of repo.languages) {
                                let validOption = true;
                                for (const filter of filterOptions.lang) {
                                    if (filter.text === lang.name) {
                                        validOption = false;
                                        break;
                                    }
                                }
                                if (validOption) {
                                    filterOptions.lang.push({
                                        key: lang.name.toLowerCase(),
                                        text: lang.name,
                                        value: lang.name.toLowerCase()
                                    });
                                }
                            }
                            for (const topic of repo.topics) {
                                let validOption = true;
                                for (const filter of filterOptions.topics) {
                                    if (filter.text === topic) {
                                        validOption = false;
                                        break;
                                    }
                                }
                                if (validOption) {
                                    filterOptions.topics.push({
                                        key: topic.toLowerCase(),
                                        text: topic,
                                        value: topic.toLowerCase()
                                    });
                                }
                            }
                        }
                        setFilter(filterOptions);
                        return json.repos;
                    })
                );
            }
        }
        fetchData();
    }, []);

    // console.log("basic", basicRepos);
    // console.log("all", repos);

    let filterOptions = {
        type: [{
            key: "owner",
            text: "Owner",
            value: "owner"
        }, {
            key: "collaborator",
            text: "Collaborator",
            value: "collaborator"
        }, {
            key: "organization",
            text: "Organization",
            value: "organization"
        }],
        lang: [],
        topics: [],
        stars: [{
            key: "asc",
            text: "Asc",
            value: "asc"
        }, {
            key: "desc",
            text: "Desc",
            value: "desc"
        }],
        isarchived: [{
            key: "is",
            text: "Is",
            value: "is"
        }, {
            key: "isnot",
            text: "Is not",
            value: "isnot"
        }],
        rel: [{
            key: "hasrel",
            text: "Has",
            value: "hasrel"
        }, {
            key: "nothasrel",
            text: "Not has",
            value: "nothasrel"
        }],
        issues: [{
            key: "has",
            text: "Has",
            value: "has"
        }, {
            key: "nothasissues",
            text: "Not has",
            value: "nothasissues"
        }]
    };

    const filterTypeOptions = [
        {
            key: "type",
            text: "Type",
            value: "type",
        },
        {
            key: "lang",
            text: "Languages",
            value: "lang",
        },
        {
            key: "topics",
            text: "Topics",
            value: "topics",
        },
        {
            key: "stars",
            text: "Stars",
            value: "stars",
        },
        {
            key: "isarchived",
            text: "is Archived",
            value: "isarchived",
        },
        {
            key: "rel",
            text: "Has Releases",
            value: "rel",
        },
        {
            key: "issues",
            text: "Have Issues",
            value: "issues",
        },
    ];

    function handleChangeSearch(e) {
        let arrayRepos = [];
        for (const repo of basicRepos) {
            if (repo.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                arrayRepos.push(repo);
            }
        }
        setSearcher(arrayRepos);
    }

    function onHandleChangeFilterType(e, target) {
        setSelectedFilterType(target.value);
    }

    function onHandleChangeFilterOptions(e, target) {
        let arrayRepos = [];
        for (const repo of repos) {
            if (selectedFilterType === "type") {
                if (target.value.indexOf(repo.type) != -1) {
                    arrayRepos.push(repo);
                }
            }
        }
        setSearcher(arrayRepos)
    }

    return (
        <div className="my-projects">
            <Header as='h1'>
                <div className="title">
                    <Icon name='github' />
                    My Projects
                </div>
                <div className="search">
                    <Input icon="search" iconPosition="left" size="mini" placeholder="Search by name" onChange={handleChangeSearch} />
                </div>
                <div className="filter">
                    <Dropdown
                        className="filter-selector"
                        placeholder="Select Filter"
                        fluid
                        selection
                        defaultValue={filterTypeOptions[0]}
                        onChange={onHandleChangeFilterType}
                        options={filterTypeOptions}
                    />
                    {
                        (selectedFilterType === "type" ||
                            selectedFilterType === "lang" ||
                            selectedFilterType === "topics") ?
                            <Dropdown
                                clearable
                                fluid
                                multiple
                                search
                                selection
                                onChange={onHandleChangeFilterOptions}
                                options={filter[selectedFilterType]}
                                placeholder="Select Options"
                            />
                            :
                            <Dropdown
                                clearable
                                fluid
                                search
                                selection
                                onChange={onHandleChangeFilterOptions}
                                options={filter[selectedFilterType]}
                                placeholder="Select Option"
                            />
                    }
                </div>
            </Header>
            <Segment color="blue" className="projects">
                {/* <Loading color="white" /> */}
                <div className="background-particles">
                    {/* {(repos) ? 
                        <Particles
                            id="tsparticles2"
                            options={linesParticlesOptions}
                        />
                        : ""
                    } */}
                    {searcher.map((repo, key) => {
                        return repo.show ?
                            (
                                <ProjectCard
                                    key={key}
                                    repo={repo}
                                />
                            ) : ""
                    })}
                </div>
            </Segment>
        </div>
    );
}

export default Projects;