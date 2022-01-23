import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import linesParticlesOptions from "../json/linesParticlesOptions.json";
import { Header, Segment, Icon, Input, Dropdown } from 'semantic-ui-react';

import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [basicRepos, setBasicRepos] = useState([]);
    const [searcher, setSearcher] = useState([]);
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
                setRepos(await fetch(`${process.env.REACT_APP_API_DOMAIN}/${process.env.REACT_APP_GIT_USER}/repos/basic`)
                    .then((res) => res.json())
                    .then((json) => {
                        return json.repos;
                    })
                );
            }
        }
        fetchData();
    }, []);

    // console.log("basic", basicRepos);
    // console.log("all", repos);

    const filterOptions = [
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
            key: "havereleases",
            text: "Have Releases",
            value: "havereleases",
        },
        {
            key: "haveissues",
            text: "Have Issues",
            value: "haveissues",
        },
    ];

    const countryOptions = [
        { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
        { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
        { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
        { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
        { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
        { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
        { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
        { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
        { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
        { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
        { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
        { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
        { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
        { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
        { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
        { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
        { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
        { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
        { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
        { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
        { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
        { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
    ]

    function handleChangeSearch(e) {
        let arrayRepos = [];
        for (const repo of basicRepos) {
            if (repo.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                arrayRepos.push(repo);
            }
        }
        setSearcher(arrayRepos);
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
                        placeholder='Select Filter'
                        fluid
                        selection
                        options={filterOptions}
                    />
                    <Dropdown
                        disabled
                        clearable
                        fluid
                        multiple
                        search
                        selection
                        options={countryOptions}
                        placeholder='Select Country'
                    />
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
                        return (
                            <ProjectCard
                                key={key}
                                repo={repo}
                            />
                        )
                    })}
                </div>
            </Segment>
        </div>
    );
}

export default Projects;