import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import Strapi from "strapi-sdk-js";
import Router from 'next/router'

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

export default async function handler(req, res) {
    //Capture order to complete payment
    // console.log(req)
    // console.log(req.body)
    // console.log(req.query)

    const {orderID} = req.body
    // events_orders : can be an **ARRAY**
    const {events_orders, total_price, order_quantity, order_user} = req.query

    // console.log(orderID)
    const PaypalClient = client()

    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})

    const response = await PaypalClient.execute(request)
    if (!response) {
        res.status(500)
    }

    await strapi.update('orders', orderID, {
        status: 'PAID',
    })
    const currentTicketsData = await strapi.findOne('events', parseInt(events_orders), {
        fields: ['tickets']
    })
    console.log(currentTicketsData)
    const {data: {id, attributes: {tickets}}} = currentTicketsData


    await strapi.update('events', parseInt(events_orders), {
        tickets: (parseInt(tickets) - parseInt(order_quantity)).toString(),
    })

    const currentTicketsData2 = await strapi.findOne('events', parseInt(events_orders), {
        fields: ['tickets']
    })
    console.log(currentTicketsData2)

    // console.log({ ...response.result })
    res.json({...response.result})

}