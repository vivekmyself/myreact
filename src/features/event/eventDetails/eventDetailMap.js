import React from "react";
import GoogleMapReact from "google-map-react";
import { Segment, Icon } from "semantic-ui-react";

const Marker = () => <Icon name="marker" color="red" size="big" />;
const EventDetailMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: "300px ", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyD4wlHSS3y4edz1PJ-4EolL8Q3RmfalMZs"
          }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker lat={lat} lng={lng} text={"Kreyser Avrora"} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

export default EventDetailMap;
