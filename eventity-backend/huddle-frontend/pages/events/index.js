import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Layout from "../../components/global/layout";
import {
  ImPriceTags,
  ImLocation2,
  ImTicket,
  ImCalendar,
  ImClock,
} from "react-icons/im";
import SectionTitle from "../../components/global/section-title";
import Link from "next/link";
import { API_URL } from "../../config";
import Pagination from "../../components/pagination";
import InnerPageLayout from "../../components/inner-page-layout";

const EventPage = ({events}) => {
  const [key, setKey] = useState("AllEvents");
  const { data } = events;
  const sportsEvents = data?.filter(evt => evt.attributes.category ==="sports")
  const corporateEvents = data?.filter(evt => evt.attributes.category ==="corporate")
  const privateEvents = data?.filter(evt => evt.attributes.category ==="private")
  const charityEvents = data?.filter(evt => evt.attributes.category ==="charity")
  const festivalEvents = data?.filter(evt => evt.attributes.category ==="festival")
  const concertEvents = data?.filter(evt => evt.attributes.category ==="concert")
  
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const eventData = data?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Layout title="Event Page">
       <InnerPageLayout title="All Events" />
      <div className="upcoming-events section-padding">
        <div className="container">
          <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="AllEvents" title="All Events">
            <div className="row">
            {eventData?.map((evt) => (
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
            {data.length > 6 ? (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={data?.length}
              paginate={paginate}
            />
          ) : (
            ""
          )}
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
          </Tab>
          <Tab eventKey="festival" title="festival Events">
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
          </Tab>
          <Tab eventKey="sports" title="sports Events">
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
          </Tab>
        </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default EventPage;

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}

