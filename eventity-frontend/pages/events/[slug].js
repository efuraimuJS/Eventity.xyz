import React, {useContext, useEffect, useState} from 'react';
import Layout from "../../components/global/layout";
import {FaUserCircle} from "react-icons/fa";
import {ImCalendar, ImClock, ImLocation2, ImPriceTags, ImTicket} from "react-icons/im";
import {API_URL} from "../../config";
import InnerPageLayout from "../../components/inner-page-layout";
import Link from "next/link";
import SectionTitle from "../../components/global/section-title";
import md from 'markdown-it';
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/router';
import {getSession} from "next-auth/react";
import {useMutation} from 'react-query'
import axios from "axios";
import * as Yup from 'yup';
import {Formik} from 'formik';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {FUNDING, PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {AlertContext} from "../../context/AlertContext";
import styles from "../../styles/SignIn.module.scss";
import AlertFlash from "../../components/global/AlertFlash";


const EventSinglePage = ({events, slug, userIdSS, session}) => {

    // This creates state variables and initializes their values
    const [show, setShow] = useState(false);
    let [ticketTotal, setTicketTotal] = useState('0')
    let [ticketQuantity, setTicketQuantity] = useState('1')
    let [checkoutError, setCheckoutError] = useState({})
    let [grossAmountG, setGrossAmountG] = useState()

    const {addAlert, alerts} = useContext(AlertContext);


// This initializes the initial values for Yup validation schema

    const initialValues = {
        ticketTotal: '0',
        ticketQuantity: '1'
    }

    // This defines the Yup validation schema

    const validateSchema = Yup.object({
        ticketTotal: Yup.string().required('Required'),
        ticketQuantity: Yup.string().required('Required')
    })

    // This function checks if a given string contains non-numeric characters

    function containsNonNumericChars(str) {
        return /\D/.test(str);
    }

    // This function closes the modal
    const handleClose = () => setShow(false);
    // This function shows the modal
    const handleShow = () => setShow(true);

    // This filters the event with the matching slug from an array of events

    const event = events?.filter((evt) => evt?.attributes?.slug === slug);
    const {id: eventId, attributes} = event[0];
    const {date, image, tickets, time, name, location, description, organizer, price} =
        attributes;

    // This function updates the ticket quantity when the user selects a new quantity

    const handleChange = (e) => {
        setTicketQuantity(e.target.value)
    }

    // This hook updates the checkout error state when the ticket quantity exceeds the number of available tickets

    useEffect(() => {
        if (parseInt(ticketQuantity) > parseInt(tickets)) {
            // console.log('Youre beyond')
            setCheckoutError({error: 'Ticket Volume Exceeded'})
        } else {
            setCheckoutError({})

        }
    }, [ticketQuantity])

    // This hook updates the ticket total when the ticket quantity changes

    useEffect(() => {
        if (ticketQuantity !== '' && !containsNonNumericChars(ticketQuantity)) {
            setTicketTotal((parseInt(ticketQuantity, 10) * parseInt(price, 10)).toString())
        } else {
            setTicketQuantity('0')
            setTicketTotal('0')
        }

    }, [ticketQuantity])

    // This initializes the router object

    const router = useRouter()

    // This object contains the data required to create a PayPal order

    const body = {
        events_orders: eventId,
        total_price: ticketTotal,
        order_quantity: parseInt(ticketQuantity, 10),
        order_users: userIdSS,
        eventName: name,
        eventPrice: price
    };


    // This mutation creates a PayPal order

    const createMutation = useMutation(() => axios.post(
            `http://localhost:3000/api/paypal/createOrder`, body
        ).then(response => response.data.orderID)
    )

    // This mutation captures a PayPal order

    const captureMutation = useMutation((orderUid) => {
        axios.post(
            `http://localhost:3000/api/paypal/captureOrder?order_quantity=${parseInt(ticketQuantity, 10)}`,
            {...orderUid},
            {headers: {"Content-Type": "application/json"}})
            .then((data) => {
                console.log(data)
                const {currency_code, value: grossAmount} = data.data.purchase_units[0].payments.captures[0].amount;
                console.log('currency_code', currency_code)
                console.log('grossAmount', grossAmount)
                setGrossAmountG(grossAmount)
            }).then(() => {
            addAlert(`Your payment of $${grossAmountG} USD to ${organizer} has been completed.`, 'success ',
                'Payment Successful!');
        }).catch((e) => {
            console.error(e)
            addAlert(`Sorry, your payment could not be processed at this time. Please try again.`, 'danger ',
                'Payment Failure!');
        })
            .finally(() => {
                handleClose()
            })
    })

    // This function creates a PayPal order and returns the order ID

    const createPayPalOrder = async () => {
        const orderUid = await createMutation.mutateAsync({})
        console.log(orderUid)
        return orderUid
    }

    // This function is called when the user approves a PayPal payment

    const onApprove = async (data) => {
        await captureMutation.mutateAsync({orderID: data.orderID});
    }

    // This function selects all the text in a form input when the user clicks on it

    const handleFocus = (event) => event.target.select();

    return (
        <Layout title={name}>
            <div className={styles.globalAuthAlerts}>
                <AlertFlash/>
            </div>
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

                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validateSchema}
                                    >
                                        {
                                            ({touched, errors, values}) => (

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
                                                            <Form.Group
                                                                className="form-floating mb-3 position-relative">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="1"
                                                                    autoFocus
                                                                    onFocus={handleFocus}
                                                                    onChange={handleChange}
                                                                    id={`ticketQuantity`}
                                                                    name={`ticketQuantity`}
                                                                    value={ticketQuantity}
                                                                    isValid={touched.ticketQuantity && Object.keys(checkoutError).length === 0}
                                                                    isInvalid={Object.keys(checkoutError).length !== 0}
                                                                />
                                                                <Form.Control.Feedback tooltip>Looks
                                                                    good!</Form.Control.Feedback>
                                                                <Form.Control.Feedback tooltip
                                                                                       type={`invalid`}>{checkoutError?.error}</Form.Control.Feedback>
                                                                <Form.Label>Ticket Quantity</Form.Label>
                                                            </Form.Group>
                                                            <Form.Group
                                                                className="form-floating mb-3 position-relative">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="0.00"
                                                                    id={`ticketTotal`}
                                                                    name={`ticketTotal`}
                                                                    value={ticketTotal}
                                                                    readOnly={true}
                                                                />
                                                                <Form.Control.Feedback tooltip>Looks
                                                                    good!</Form.Control.Feedback>
                                                                <Form.Control.Feedback tooltip
                                                                                       type={`invalid`}>{errors?.ticketTotal}</Form.Control.Feedback>
                                                                <Form.Label>Tickets' Total</Form.Label>
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
                                                            {
                                                                (Object.keys(checkoutError).length === 0 && !(parseInt(ticketQuantity, 10) < 1) ?
                                                                    (
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
                                                                        />
                                                                    ) :
                                                                    null)
                                                            }

                                                        </PayPalScriptProvider>

                                                    </Modal.Footer>
                                                </Modal>
                                            )
                                        }

                                    </Formik>
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


export async function getServerSideProps({req, query: {slug}}) {
    const result = await fetch(`${API_URL}/api/events?populate=*`);
    const allEvents = await result.json();
    const events = allEvents.data;
    // console.log(events)
    const session = await getSession({req})
    const {id: userIdSS} = session ?? {}
    // console.log(session)

    if (!session) {

        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        }
    }


    return {
        props: {
            session,
            events,
            slug,
            userIdSS,

        },
    };
}