import { Card, Image, Icon, Placeholder } from "semantic-ui-react";

import Topic from "./Topic";

function ProjectCard(props) {
  let repo = "";
  let name = "";
  let description = "";
  let banner = "";
  let stars = "";
  let topics = "";
  let link = "";
  if (!props.placeholder) {
    repo = props.repo;
    name = repo.name;
    description = repo.description
      ? repo.description.length > 55
        ? repo.description.substring(0, 55) + "..."
        : repo.description
      : "Without description";
    banner = repo.banner
      ? repo.banner
      : "https://is2-ssl.mzstatic.com/image/thumb/Purple115/v4/a5/d7/78/a5d7782e-ea19-f0e7-6af7-97d8611ebfc7/AppIcon-0-1x_U007emarketing-0-7-0-85-220.png/1920x1080bb-80.png";
    stars = repo.stars;
    topics = repo.topics;
    link = repo.link;
  }

  return (
    <Card>
      <div className="image">
        {props.placeholder ? (
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        ) : (
          <>
            <Image src={banner} wrapped ui={false} />
            <p>{name}</p>
          </>
        )}
      </div>
      <Card.Content>
        <Card.Description title={repo.description}>{description}</Card.Description>
        <div className="stars">
          <Icon name="star outline" />
          {stars}
        </div>
      </Card.Content>
      <Card.Content extra>
        {!props.placeholder
          ? topics.map((topic, index) => {
              return <Topic key={index} name={topic} />;
            })
          : ""}
      </Card.Content>
    </Card>
  );
}

export default ProjectCard;
