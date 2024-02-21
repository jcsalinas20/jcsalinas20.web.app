import React from "react";
import { Popup, Header, Icon, Image } from "semantic-ui-react";

function TargetProfile(props) {
  const url = props.data.url;
  const username = props.data.username;
  const name = props.data.name;
  const avatar = props.data.avatar;
  const location = props.data.location;
  const company = props.data.company;
  const blog = props.data.website;
  const twitter = props.data.twitter;

  return (
    <Popup
      className="taget-profile"
      trigger={
        <a target="_blank" rel="noreferrer" href={url}>
          {username}
        </a>
      }
      flowing
      hoverable
      inverted
    >
      <Header as="h3">
        <Image src={avatar} circular />
        {name}
      </Header>
      <hr />
      <p>
        <Icon name="map marker alternate" color="green" />
        <b>Location: </b> {location}
      </p>
      <p>
        <Icon name="building" color="violet" />
        <b>Company: </b> {company}
      </p>
      <p>
        <Icon name="globe" color="teal" />
        <b>Blog: </b> <a href="/#">{blog}</a>
      </p>
      <p>
        <Icon name="twitter" color="blue" />
        <b>Twitter: </b>{" "}
        <a target="_blank" rel="noreferrer" href={"https://twitter.com/" + twitter}>
          {twitter}
        </a>
      </p>
    </Popup>
  );
}

export default TargetProfile;
