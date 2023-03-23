import client from '../../../lib/paypal'
import paypal from '@paypal/checkout-server-sdk'
import Strapi from "strapi-sdk-js";

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
    const {orderID} = req.body
    console.log(orderID)
    const PaypalClient = client()

    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})

    const response = await PaypalClient.execute(request)
    if (!response) {
        res.status(500)
    }

    // await strapi.update('orders', 1, {
    //     status: 'PAID'
    // })
    // console.log({ ...response.result })
    res.json({ ...response.result })

}