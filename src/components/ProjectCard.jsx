import { Card, Image, Icon } from "semantic-ui-react";

import Topic from "./Topic";

function ProjectCard(props) {
    const repo = props.repo;
    const name = repo.name;
    const description = (repo.description) ? (repo.description.length > 55) ? repo.description.substring(0, 55) + "..." : repo.description : "Without description";
    const banner = (repo.banner) ? repo.banner : "https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/a5/d7/78/a5d7782e-ea19-f0e7-6af7-97d8611ebfc7/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1920x1080bb-80.png";
    const stars = repo.stars;
    const topics = repo.topics;
    const link = repo.link;


    return (
        <Card>
            <div className="image">
                <Image src={banner} wrapped ui={false} />
                <p>{name}</p>
            </div>
            <Card.Content>
                <Card.Description title={repo.description}>{description}</Card.Description>
                <div className="stars">
                    <Icon name="star outline" />{stars}
                </div>
            </Card.Content>
            <Card.Content extra>
                {
                    topics.map((topic, index) => {
                        return <Topic key={index} name={topic} />
                    })
                }
            </Card.Content>
        </Card>
    );
}

export default ProjectCard;