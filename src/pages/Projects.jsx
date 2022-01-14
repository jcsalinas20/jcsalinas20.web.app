import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import linesParticlesOptions from "../json/linesParticlesOptions.json";
import { Header, Segment, Icon, Input, Dropdown } from 'semantic-ui-react';

import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [collabs, setCollabs] = useState([]);
    const [error503, setError503] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setRepos(await fetch(`${process.env.REACT_APP_API_DOMAIN}/repos/get`)
                .then((res) => res.json())
                .then((json) => {
                    if (json.status) {
                        setError503(true);
                        return {};
                    }
                    return json.repos;
                })
            );
            if (!error503) {
                setCollabs(await fetch(`${process.env.REACT_APP_API_DOMAIN}/collabs/get`)
                    .then((res) => res.json())
                    .then((json) => {
                        return json.collabs;
                    })
                );
            }
        }
        fetchData();
    }, []);

    // console.log(repos);
    // console.log(collabs);

    const friendOptions = [
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
            image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu',
            image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
        },
        {
            key: 'Stevie Feliciano',
            text: 'Stevie Feliciano',
            value: 'Stevie Feliciano',
            image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
        },
        {
            key: 'Christian',
            text: 'Christian',
            value: 'Christian',
            image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
        },
        {
            key: 'Matt',
            text: 'Matt',
            value: 'Matt',
            image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
        },
        {
            key: 'Justen Kitsune',
            text: 'Justen Kitsune',
            value: 'Justen Kitsune',
            image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
        },
    ]
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

    return (
        <div className="my-projects">
            <Header as='h1'>
                <div className="title">
                    <Icon name='github' />
                    My Projects
                </div>
                <div className="search">
                    <Input disabled icon="search" iconPosition="left" size="mini" placeholder="Search by name" />
                </div>
                <div className="filter">
                    <Dropdown
                        disabled
                        placeholder='Select Filter'
                        fluid
                        selection
                        options={friendOptions}
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
                    {repos.map((repo, key) => {
                        return (
                            <ProjectCard
                                key={key}
                                description={repo.description}
                                stars={repo.stars}
                                topics={repo.topics}
                                repo={repo}
                            />
                        )
                    })}
                    {collabs.map((collab, key) => {
                        return (
                            <ProjectCard
                                key={key}
                                description={collab.description}
                                stars={collab.stars}
                                topics={collab.topics}
                                repo={collab}
                            />
                        )
                    })}
                </div>
            </Segment>
        </div>
    );
}

export default Projects;