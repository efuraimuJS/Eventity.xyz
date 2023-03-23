import React, {useEffect, useState} from 'react';
import Layout from "../../components/global/layout";
import {FaUserCircle} from "react-icons/fa";
import {ImCalendar, ImClock, ImLocation2, ImPriceTags, ImTicket} from "react-icons/im";
import {API_URL} from "../../config";
import InnerPageLayout from "../../components/inner-page-layout";
import Link from "next/link";
import SectionTitle from "../../components/global/section-title";
import md from 'markdown-it';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useRouter} from 'next/router';
import {FUNDING, PayPalButtons, PayPalScriptProvider,} from '@paypal/react-paypal-js'
import {useSession} from "next-auth/react";
import {useMutation} from 'react-query'
import axios from "axios";


const EventSinglePage = ({events, slug}) => {
    const [show, setShow] = useState(false);
    let [ticketTotal, setTicketTotal] = useState('0')
    let [ticketQuantity, setTicketQuantity] = useState('1')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let globalUserId; // define the global variable outside of any functions

    const userIdPromise = new Promise(async function (resolve, reject) {
        try {
            const session = await useSession()
            const {data: {id}} = session;
            resolve(id);
        } catch (e) {
            reject(e);
        }
    });

    userIdPromise.then(userId => {
        globalUserId = userId; // assign the value of userId to the global variable
    }).catch(error => {
        // console.error(error);
    });

    async function getUserId() {
        try {
            const userId = await userIdPromise;
            return userId;
        } catch (error) {
            // console.error(error);
        }
    }

    getUserId().then(userId => {
        // console.log(userId); // this will log the value of userId retrieved from the promise
        console.log(globalUserId); // this will also log the value of userId assigned to the global variable
    }).catch(error => {
        // console.error(error);
    });

    useEffect(() => {
        setTicketTotal((parseInt(ticketQuantity) * parseInt(price)).toString())
    }, [ticketQuantity])

    const handleChange = (e) => setTicketQuantity(e.target.value)

    const event = events?.filter((evt) => evt?.attributes?.slug === slug);
    const {id: eventId, attributes} = event[0];
    const {date, image, tickets, time, name, location, description, organizer, price} =
        attributes;

    const router = useRouter()

    // function handlePaypalSubmit(e) {
    //     // e.preventDefault()
    //     //
    //     router.push(
    //         {
    //             pathname: `${process.env.NEXTAUTH_URL}/api/paypal/createOrder`,
    //             query: {
    //
    //                 events_orders: id,
    //                 total_price: ticketTotal,
    //                 order_quantity: ticketQuantity,
    //                 order_user: globalUserId,
    //
    //             }
    //         }
    //         , `http://localhost:3000/api/paypal/createOrder?events_orders=${id}&total_price=${ticketTotal}&order_quantity=${ticketQuantity}&order_user=${globalUserId}`
    //     )
    // }

    const createMutation = useMutation(() => axios.post(
        `http://localhost:3000/api/paypal/createOrder?events_orders=${eventId}&total_price=${ticketTotal}&order_quantity=${ticketQuantity}&order_user=${globalUserId}&eventName=${name}&eventPrice=${price}`
    ).then(response => response.data.orderID))

    const captureMutation = useMutation((orderUid) => {
        // console.log('DataLog', data)
        axios.post(
            `http://localhost:3000/api/paypal/captureOrder?events_orders=${eventId}&total_price=${ticketTotal}&order_quantity=${ticketQuantity}&order_user=${globalUserId}`,
            {...orderUid},
            {headers: {"Content-Type": "application/json"}}
        )
    })

    const createPayPalOrder = async () => {
        const orderUid = await createMutation.mutateAsync({})
        // console.log(response)
        console.log(orderUid)
        return orderUid

    }

    const onApprove = async (data) => {
        // console.log(data)
        await captureMutation.mutateAsync({orderID: data.orderID});
    }

    // {
    //     console.log(captureMutation.data)
    // }

    const {data: session} =  useSession();

    useEffect(() => {
        if (session == null) return;
        // console.log('session.jwt', session.jwt);
    }, [session]);


    // Check if a user is signed in? Else Rerender the SignIn page
    // if (!session) {
    //     useEffect(() => {
    //         // alert(`You aren't authorize to proceed, kindly login!`)
    //         router.replace('/signin')
    //
    //     }, [])
    //     return;
    // }

    return (
        <Layout title={name}>
            <InnerPageLayout title={name}/>
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
                            <div className="singlePage__event-description"
                                 dangerouslySetInnerHTML={{__html: md().render(description)}}/>
                        </div>
                        <div className="col-lg-4">
                            <div className="singlePage__sidebar">
                                <h2 className="singlePage__sidebar--title">Event details</h2>
                                <div className="singlePage__sidebar--details">
                                    <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                                        <div className="singlePage__sidebar--icon">
                                            <FaUserCircle/>
                                        </div>
                                        <div>
                                            <p>Organized by</p>
                                            <h5>{organizer}</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                                        <div className="singlePage__sidebar--icon">
                                            <ImCalendar/>
                                        </div>
                                        <div>
                                            <p>Date & Time</p>
                                            <h5>{date}, {time.slice(0, 5)}</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                                        <div className="singlePage__sidebar--icon">
                                            <ImLocation2/>
                                        </div>
                                        <div>
                                            <p>Location</p>
                                            <h5>{location}</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                                        <div className="singlePage__sidebar--icon">
                                            <ImPriceTags/>
                                        </div>
                                        <div>
                                            <p>Ticket Price</p>
                                            <h5>/={price} per ticket</h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4 mb-4 mb-lg-5">
                                        <div className="singlePage__sidebar--icon">
                                            <ImTicket/>
                                        </div>
                                        <div>
                                            <p>Remaining seats</p>
                                            <h5>{tickets} tickets are available</h5>
                                        </div>
                                    </div>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        size="lg"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>{`${name} Checkout`}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                {/*controlId="exampleForm.ControlInput1"*/}
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Ticket Quantity</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="1"
                                                        autoFocus
                                                        onChange={handleChange}
                                                        id={`ticketQuantity`}
                                                        name={`ticketQuantity`}
                                                        value={ticketQuantity}
                                                    />
                                                </Form.Group>
                                                {/*controlId="exampleForm.ControlTextarea1"*/}
                                                <Form.Group
                                                    className="mb-3"

                                                >
                                                    <Form.Label>Tickets' Total</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="0.00"
                                                        autoFocus
                                                        onChange={handleChange}
                                                        id={`ticketTotal`}
                                                        name={`ticketTotal`}
                                                        value={ticketTotal}
                                                        readOnly={true}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <PayPalScriptProvider
                                                options={{
                                                    'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                                                    currency: 'USD',
                                                }}
                                            >
                                                <PayPalButtons
                                                    style={{
                                                        color: 'gold',
                                                        shape: 'rect',
                                                        label: 'pay',
                                                        height: 50,
                                                    }}
                                                    fundingSource={FUNDING.PAYPAL}
                                                    createOrder={createPayPalOrder}
                                                    onApprove={onApprove}
                                                    // onClick={handlePaypalSubmit}
                                                />
                                            </PayPalScriptProvider>

                                        </Modal.Footer>
                                    </Modal>
                                    <Button className="button w-100 mt-4" onClick={handleShow}>
                                        Confirm your ticket
                                    </Button>
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
                                                    <Link
                                                        href={`/events/${evt?.attributes?.slug}`}>{evt?.attributes?.name}</Link>
                                                </h3>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <div className="price d-flex align-items-center gap-2">
                                                    <ImPriceTags/> <span>${evt.attributes.price}</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <ImTicket/>{" "}
                                                    <span>{evt.attributes.tickets} remaining</span>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <ImLocation2/> <span>{evt.attributes.location}</span>
                                            </div>
                                            <div className="timing">
                                                <div className="d-flex align-items-center gap-2">
                                                    <ImCalendar/>
                                                    <span>{evt.attributes.date}</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <ImClock/>
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


export async function getServerSideProps({query: {slug}}) {
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
