import Link from "next/link";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import SectionTitle from "./global/section-title";
import {
  ImPriceTags,
  ImLocation2,
  ImTicket,
  ImCalendar,
  ImClock,
} from "react-icons/im";
import { API_URL } from "../config";

const UpcomingEvents = ({ events }) => {
  const sportsEvents = events?.filter(
    (evt) => evt.attributes.category === "sports"
  );
  const corporateEvents = events?.filter(
    (evt) => evt.attributes.category === "corporate"
  );
  const privateEvents = events?.filter(
    (evt) => evt.attributes.category === "private"
  );
  const charityEvents = events?.filter(
    (evt) => evt.attributes.category === "charity"
  );
  const festivalEvents = events?.filter(
    (evt) => evt.attributes.category === "festival"
  );
  const concertEvents = events?.filter(
    (evt) => evt.attributes.category === "concert"
  );
  const partyEvents = events?.filter(
    (evt) => evt.attributes.category === "party"
  );
  const [key, setKey] = useState("AllEvents");
  return (
    <div id="upcoming-events" className="upcoming-events section-padding">
      <div className="container">
        <SectionTitle title="Upcoming Events" />
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="AllEvents" title="All Events">
            <div className="row">
              {events?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
          <Tab eventKey="corporate" title="Corporate Events">
            <div className="row">
              {corporateEvents?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
          <Tab eventKey="private" title="Private Events">
            <div className="row">
              {privateEvents?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
          <Tab eventKey="charity" title="Charity Events">
            <div className="row">
              {charityEvents?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
          <Tab eventKey="festival" title="Festival Events">
            <div className="row">
              {festivalEvents?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
          <Tab eventKey="sports" title="Sports Events">
            <div className="row">
              {sportsEvents?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
          <Tab eventKey="concert" title="Concert Events">
            <div className="row">
              {concertEvents?.slice(0, 6).map((evt) => (
                <div key={evt.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="upcoming-events__item">
                    <div className="image">
                      <img
                        className="img-fluid"
                        src={`${API_URL}${evt.attributes?.image?.data?.attributes.url}`}
                        alt={evt.attributes.image.data.attributes.name}
                      />
                      {evt?.attributes?.eventType !== "none" ? (
                        <div className="popular">
                          {evt?.attributes?.eventType}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="upcoming-events__item__info">
                      <div className="title">
                        <h3>
                          <Link href={`/events/${evt?.attributes?.slug}`}>
                            {evt?.attributes?.name}
                          </Link>
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
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default UpcomingEvents;
