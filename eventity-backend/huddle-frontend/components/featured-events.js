import React from "react";
import SectionTitle from "./global/section-title";
import {
  ImPriceTags,
  ImLocation2,
  ImTicket,
  ImCalendar,
  ImClock,
} from "react-icons/im";
import Link from "next/link";
import { API_URL } from "../config";

const FeaturedEvents = ({ events }) => {
  const data = events?.filter(evt => evt?.attributes?.eventType === "featured")
  return (
    <div id="featured-events" className="featured-events section-padding">
      <div className="container">
        <SectionTitle title="Featured Events" />
        <div className="row">
          {data?.slice(0, 3).map((evt) => (
            <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
              <div className="upcoming-events__item">
                <div className="image">
                  <img
                    className="img-fluid"
                    src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                    alt={evt.attributes.image.data.attributes.name}
                  />
                  <div className="popular">{evt?.attributes?.eventType}</div>
                </div>
                <div className="upcoming-events__item__info">
                  <div className="title">
                    <h3>
                      <Link href={`/events/${evt?.attributes?.slug}`}>{evt?.attributes?.name}</Link>
                    </h3>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="price d-flex align-items-center gap-2">
                      <ImPriceTags /> <span>${evt.attributes.price}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <ImTicket />{" "}
                      <span>{evt.attributes.tickets} remaining</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ImLocation2 /> <span>{evt.attributes.location}</span>
                  </div>
                  <div className="timing">
                    <div className="d-flex align-items-center gap-2">
                      <ImCalendar />
                      <span>{evt.attributes.date}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <ImClock />
                      <span>{evt.attributes.time.slice(0, 5)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
