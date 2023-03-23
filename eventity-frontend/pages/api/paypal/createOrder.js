import Strapi from "strapi-sdk-js";
import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'


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
    // console.log(req.query)
    // console.log(req.body)

    const {events_orders, total_price, order_quantity, order_user} = req.query
    // console.log(events_orders)
    // console.log(total_price)
    // console.log(order_quantity)
    // console.log(order_user)

    const PaypalClient = client()

    const request = new paypal.orders.OrdersCreateRequest()
    request.headers['prefer'] = 'return=representation'

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: total_price,
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: total_price
                        }
                    }
                },
                // items: {
                //     name: eventName,
                //     unit_amount: {
                //         currency_code: "USD",
                //         value: eventPrice
                //     },
                //     quantity: order_quantity
                //
                // }
            },
        ],
    })
    const response = await PaypalClient.execute(request)
    // console.log(response)
    if (response.statusCode !== 201) {
        res.status(500)
    }
    await strapi.create('orders', {
        order_uid: response.result.id,
        events_orders: events_orders,
        total_price: total_price,
        order_quantity: order_quantity,
        order_user: order_user,
        status: 'PENDING'
    })
    // console.log({order_uid: response.result.id})
    res.json({orderID: response.result.id})
}

