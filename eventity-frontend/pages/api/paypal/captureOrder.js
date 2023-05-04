import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import Strapi from "strapi-sdk-js";

// Define the Strapi object with configuration options

const strapi = new Strapi({
    url: "http://localhost:1337",
    prefix: "/api",
    store: {
        key: "strapi_jwt",
        useLocalStorage: false,
        cookieOptions: {path: "/"},
    },
    axiosOptions: {},
});

// Define the asynchronous `handler` function which is called when the webhook is triggered

export default async function handler(req, res) {
    //Capture order to complete payment
    // Extract the order ID and order quantity from the request body and query string
    const {orderID} = req.body
    // events_orders : can be an **ARRAY**
    const {order_quantity} = req.query

    // Initialize the PayPal client and create a request to capture the order

    const PaypalClient = client()
    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})

    // Execute the request and check for a response

    const response = await PaypalClient.execute(request)
    if (!response) {
        res.status(500)
    }

    // Find the order and associated event data from the Strapi database

    const currentTicketsData3 = await strapi.find('orders', {
        filters: {
            order_uid: {
                $eq: orderID
            }
        },
        sort: 'order_uid:asc',
        pagination: {
            start: 0,
            limit: 0
        },
        fields: ['id'],
        populate: ['events_orders'],
        // publicationState: 'live',
        // locale: 'all'
    })

    // Extract the order ID and event ID from the database response

    const {
        data: [{
            id: currentDbOrderId,
            attributes: {events_orders: {data: [{id: eventId, attributes: eventData}]}}
        }]
    } = currentTicketsData3;
    const {
        data: [{attributes: {events_orders: {data: [{attributes: thisEventData}]}}}]
    } = currentTicketsData3

    // Log the event data and ticket information for debugging

    console.log('thisEventData', thisEventData)
    console.log('thisEventData.tickets', thisEventData.tickets)

    // Update the order status in the Strapi database to "PAID"

    await strapi.update('orders', currentDbOrderId, {
        status: 'PAID',
    })

    // Find the current ticket data for the event and update the ticket count

    const oldTicketsData = await strapi.findOne('events', parseInt(eventId), {
        fields: ['tickets']
    })
    console.log('oldTicketsData', oldTicketsData)

    await strapi.update('events', parseInt(eventId), {
        tickets: (parseInt(thisEventData.tickets) - parseInt(order_quantity)).toString(),
    })

    // Find the updated ticket data for the event and log it for debugging

    const newTicketsData = await strapi.findOne('events', parseInt(eventId), {
        fields: ['tickets']
    })

    console.log('newTicketsData', newTicketsData)

    console.log({ ...response.result })
    // Send the PayPal response

    res.json({...response.result})
}