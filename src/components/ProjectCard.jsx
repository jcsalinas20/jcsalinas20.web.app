import { Card, Image, Icon } from "semantic-ui-react";

import Topic from "./Topic";

function ProjectCard(props) {
    const name = props.name;
    const description = props.description;
    const icon = props.icon;
    const stars = props.stars;
    const topics = props.topics;
    const link = props.link;


    return (
        <Card>
            <Image src='https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/a5/d7/78/a5d7782e-ea19-f0e7-6af7-97d8611ebfc7/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1920x1080bb-80.png' wrapped ui={false} />
            <Card.Content>
                <Card.Description>{description}</Card.Description>
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