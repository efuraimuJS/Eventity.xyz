import React from "react";
import Layout from "../../components/global/layout";
import { FaUserCircle } from "react-icons/fa";
import { ImLocation2, ImTicket, ImCalendar, ImPriceTags, ImClock } from "react-icons/im";
import { API_URL } from "../../config";
import InnerPageLayout from "../../components/inner-page-layout";
import Link from "next/link";
import SectionTitle from "../../components/global/section-title";
import md from 'markdown-it';

const EventSinglePage = ({events, slug}) => {
  const event = events?.filter((evt) => evt?.attributes?.slug === slug);
  const { attributes } = event[0];
  const { date, image, tickets, time, name, location, description, organizer, price } =
    attributes;
  return (
    <Layout title={name}>
       <InnerPageLayout title={name} />
      <div className="singlePage section-padding">
        <div className="container">
          <h2>{name}</h2>
          <p>{location}</p>
          <div className="row">
            <div className="col-lg-8">
              <img
                className="w-100 object-fit-cover"
                src={`${API_URL}${image.data.attributes.url}`}
                alt=""
              />
              <h2 className="pt-3 mb-3">About {name}</h2>
              <div className="singlePage__event-description" dangerouslySetInnerHTML={{ __html: md().render(description) }} />
            </div>
            <div className="col-lg-4">
             <div className="singlePage__sidebar">
             <h2 className="singlePage__sidebar--title">Event details</h2>
              <div className="singlePage__sidebar--details">
                <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                  <div className="singlePage__sidebar--icon">
                    <FaUserCircle />
                  </div>
                  <div>
                    <p>Organized by</p>
                    <h5>{organizer}</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                  <div className="singlePage__sidebar--icon">
                    <ImCalendar />
                  </div>
                  <div>
                    <p>Date & Time</p>
                    <h5>{date}, {time.slice(0, 5)}</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                  <div className="singlePage__sidebar--icon">
                    <ImLocation2 />
                  </div>
                  <div>
                    <p>Location</p>
                    <h5>{location}</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                  <div className="singlePage__sidebar--icon">
                    <ImPriceTags />
                  </div>
                  <div>
                    <p>Ticket Price</p>
                    <h5>${price} per ticket</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                  <div className="singlePage__sidebar--icon">
                    <ImTicket />
                  </div>
                  <div>
                    <p>Remaining seats</p>
                    <h5>{tickets} tickets are available</h5>
                  </div>
                </div>
                <Link className="button w-100 mt-4" target="_blank" href="https://eticket.railway.gov.bd/">
                  Confirm your ticket
                </Link>
              </div>
             </div>
            </div>
          </div> 
          <div className="more-events section-padding-t">
            <SectionTitle position="left" title="More Events"/>
          <div className="row">
            {events?.slice(0, 3).map((evt) => (
            <div key={evt.id} className="col-md-6 col-lg-4 mb-4 mb-lg-0">
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
      </div>
    </Layout>
  );
};

export default EventSinglePage;


export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const allEvents = await res.json();
  const events = allEvents.data;

  return {
    props: {
      events,
      slug,
    },
  };
}
