import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/SignIn.module.scss'
import Link from 'next/link'
import Image from "next/image";
import {AiFillGoogleCircle} from "react-icons/ai";
import Alert from 'react-bootstrap/Alert';

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router'
import {useEffect, useState} from "react";

import * as Yup from 'yup';
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from 'formik';


export default function SignUp() {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState([])

    const {data: session} = useSession()
    const router = useRouter()

    // Add this useEffect block
    useEffect(() => {
        console.dir(alert);
    }, [alert]);

    const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    const validateSchema = Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Insert a valid email').required('Required'),
        password: Yup.string().required("Required"),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null, "Passwords must match"]).required('Required')
    })

    const onSubmit = (values, {setSubmitting, resetForm}) => {
        // setAlert()
        // setEmail()

        // console.log(e.target.username.value, e.target.password.value, e.target.passwordConfirm.value, e.target.email.value)
        // console.log(values)
        axios
            .post('http://localhost:1337/api/auth/local/register', values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                // Handle success.
                const message = `Please check your email (${values.email}) to confirm your account.`;

                setAlert(['success', message])
                setEmail(values.email)
                // console.log('Well done!');
                // console.log('User profile', response.data.user);
                // console.log('User token', response.data.jwt);
                resetForm();

            })
            .catch(error => {
                // Handle error.
                console.log(error)
                // console.log(error.response.data.error.message)
                if (!error.response.data.error.message) {
                    setAlert(['error', 'Something went wrong'])
                } else {
                    const messages = []
                    messages.push(error.response.data.error.message)

                    // console.log(messages)
                    // console.log(messages[0])

                    const errorSet = new Set();
                    messages.map((message, i) => {
                        let msgToPush = `<li>&#8226; ${message}</li>`.trim()
                        errorSet.add(msgToPush)

                    });
                    setAlert(['alert', errorSet]);
                    setShow(true)
                }
                // console.log('An error occurred:', error.response);
            }).finally(() => {
            setSubmitting(false)
        });
    }

    // Check if a user is signed in? Else Rerender the SignIn page
    if (session) {
        router.replace('/')
        return;
    }

    return (<>
            <div className={`${styles.masterContainer} d-flex`}>


                <div className={`${styles.signinContainer} position-absolute`}>
                    <Row>
                        <Col sm={`12`} md="5">
                            <div>
                                <Link href={`/`}>
                                    <Image src="/logo-no-background_web.svg" alt="Eventity.xyz" width={150}
                                           height={37}/>
                                </Link>
                            </div>
                            <div id={styles.formBoxContainer} className={`mx-3 pt-3`}>
                                {
                                    ((alert && show) && (
                                        <> <Alert className={styles.authAlerts} variant="danger"
                                                  onClose={() => setShow(false)} dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <ul>
                                                <div dangerouslySetInnerHTML={{ __html: alert[1][Symbol.iterator]().next().value }} />
                                            </ul>
                                        </Alert>
                                        </>
                                    ))
                                }
                                <h1>Create your <br/> account</h1>
                                <Formik initialValues={initialValues}
                                        validateSchema={validateSchema}
                                        onSubmit={(values, {
                                            setSubmitting,
                                            resetForm
                                        }) => onSubmit(values, {setSubmitting, resetForm})}
                                >
                                    {
                                        ({isSubmitting, isValid}) => (
                                            <Form>
                                                <div className="form-floating mb-1">
                                                    <Field type="text"
                                                           className="form-control"
                                                           id="username"
                                                           name="username"
                                                           placeholder="John Doe"/>
                                                    <div className="invalid-feedback"><ErrorMessage name="username"/>
                                                    </div>
                                                    <label htmlFor="username">Username</label>
                                                </div>
                                                <div className="form-floating mb-1">
                                                    <Field type="email"
                                                           className="form-control"
                                                           id="email"
                                                           name="email"
                                                           placeholder="Email Address"/>
                                                    <div className="invalid-feedback"><ErrorMessage name="email"/></div>
                                                    <label htmlFor="email">Email Address</label>
                                                </div>
                                                <div className="form-floating mb-1">
                                                    <Field type="password"
                                                           className="form-control"
                                                           id="password"
                                                           name="password"
                                                           placeholder="Password"/>
                                                    <div className="invalid-feedback"><ErrorMessage name="password"/>
                                                    </div>
                                                    <label htmlFor="password">Password</label>
                                                </div>
                                                <div className="form-floating mb-1">
                                                    <Field type="password"
                                                           className="form-control"
                                                           id="passwordConfirm"
                                                           name="passwordConfirm"
                                                           placeholder="passwordConfirm"/>
                                                    <div className="invalid-feedback"><ErrorMessage
                                                        name="passwordConfirm"/>
                                                    </div>
                                                    <label htmlFor="passwordConfirm">Confirm Password</label>
                                                </div>
                                                <div className="d-grid pt-3">
                                                    <button
                                                        className="btn btn-primary btn-lg"
                                                        type="submit">Sign Up
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                </Formik>
                                <div className={`position-relative`}>
                                    <hr className={`mt-5 pb-0`}/>
                                    <b>
                                        <p style={{fontSize: "21px", zIndex: "999"}}
                                           className={`pb-2 position-absolute top-50 start-50 translate-middle`}> or</p>
                                    </b>
                                </div>
                                <div className="d-grid pt-3">
                                    <button className="btn btn-primary btn-lg" type="submit">
                                        <AiFillGoogleCircle/>&nbsp;Sign in with Google
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col
                            md="7" className={`d-none d-md-inline-block`}>
                            <Image
                                // style={{objectFit: "cover"}}
                                className={styles.signinImage}
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtMAAAJbCAYAAAAmFxiEAAAAAXNSR0IArs4c6QAAIABJREFUeF7t3eey5La5LuDl7SDnbMs5R/n+78J/HWRbDrIsyTnndOqdOlRRMLtJfqsHs+bTwyrVDtMgiAfo1S9BkHzTN7/5zf/e2QgQIECAAAECBAgQOC3wJmH6tJkCBAgQIECAAAECBB4JCNMGAgECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQIECAAAECBAgQKAoI00U4xQgQIECAAAECBAgI08YAAQIECBAgQIAAgaKAMF2EU4wAAQIECBAgQICAMG0MECBAgAABAgQIECgKCNNFOMUIECBAgAABAgQICNPGAAECBAgQIECAAIGigDBdhFOMAAECBAgQIECAgDBtDBAgQIAAAQIECBAoCgjTRTjFCBAgQIAAAQIECAjTxgABAgQIECBAgACBooAwXYRTjAABAgQIECBAgIAwbQwQGAQ+8YlP3H3sYx+7e9Ob3nRvmz/+8Y933/ve9y7u521ve9vdRz/60bv3ve99d/nf/+///u+1z/7nP/+5+8c//nH3+9///u4Xv/jFo//96HZpv//973/v/vWvf93luLLPP//5z0d3eepzH/7wh+8+/elPv649R3fwq1/96u4nP/nJ5sff/OY3333ta1+7e/vb3350d6997m9/+9vdt771ravlsv/0/fvf//7X9Ufc/vnPfz5y++Uvf/nY3E436jEVSPs/8pGP3L3zne+8i8nyXbjPmMyhPvvss3cf+tCH7p555pnXxkZs//3vf79mG+Mz25Me68uxZsynbe94xzsemWVL22L217/+9S7j+te//vWZpj367KW+iFn+JmSfP//5z0/vN9+h9Md73/veu7e+9a2v6+P8jfjDH/5w98orr5z6u3P6IBQg0ERAmG7SkZpxO4FZYTr1JEgvP7zXWpAft1dfffXQj2Z+IBMI3/KWt1xFyY/87373u7sXX3zxUZi55fapT33qUdsqJyTXwnROOj73uc/ttm2rLXthOmHo4x//+KMQfW17nG637IPKvhKwchL0nve8Z7fvcnKRsJWTi73tXe9616P95n/u2f7mN7+5e+mllw6NyYcw1mOV8Z4Tj73tL3/5y6O2HTlhONMXf//73+9efvnlu9gd2dIXCf57f3vydyFh/ac//emR3foMgTesgDD9hu16Db8kcMswndmd73//+/9TVQLhBz/4wd3Asi6YEJcftoTfa8eegLGe4d7r6RzjD3/4w0PhZW9fy79/4QtfuPvABz5w9OOv+9y1MJ2A/slPfvJU+5adXwvTCdFx2wsX6wP905/+9GgGPfvtsCUUfuYznzk165+w9bOf/exqoD6738zm5iQvttdO8vI9fdJjPSd3Mds7AVuPj8wm5zucK06XtgTpfIcyy310O9IX2dfZvz3pj4T0H//4x0cPxecIvOEEhOk3XJdr8J5ALqvmv7NbLl2/+93vfq3YpR/NrRCQmaXf/va3j8Jywllm8BJGM3u0nmG+9oOZmdXMkK0DYfabfWbf2W8CfC7fZ//LrHF+LPOZS0srzjrk81//+tdfm6nLMSew52TgyJZZu0uXwxNccvzZctwJtEeXv2QmNcFv3LK/BPS1W441x5xgn9ATr3wu42L9ucdxInLE6Naf2QpvRw3in6C1Ndsaq4TCLCVYtoyHhLP0cZYZbY3J1J1lSFv9lf08hLG+ZZa25UQgbYvHpXGT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CBAgQIAAAQLdBITpbj2qPQQIECBAgAABAtMEhOlp1CoiQIAAAQIECBDoJiBMd+tR7SFAgAABAgQIEJgmIExPo1YRAQIECBAgQIBANwFhuluPag8BAgQIECBAgMA0AWF6GrWKCBAgQIAAAQIEugkI0916VHsIECBAgAABAgSmCQjT06hVRIAAAQIECBAg0E1AmO7Wo9pDgAABAgQIECAwTUCYnkatIgIECBAgQIAAgW4CwnS3HtUeAgQIECBAgACBaQLC9DRqFREgQIAAAQIECHQTEKa79aj2ECBAgAABAgQITBMQpqdRq4gAAQIECBAgQKCbgDDdrUe1hwABAgQIECBAYJqAMD2NWkUECBAgQIAAAQLdBITpbj2qPQQIECBAgAABAtMEhOlp1CoiQIAAAQIECBDoJiBMd+tR7SFAgAABAgQIEJgmIExPo1YRAQIECBAgQIBANwFhuluPag8BAgQIECBAgMA0AWF6GrWKCBAgQIAAAQIEugkI0916VHsIECBAgAABAgSmCQjT06hVRIAAAQIECBAg0E1AmO7Wo9pDgAABAgQIECAwTUCYnkatIgIECBAgQIAAgW4CwnS3HtUeAgQIECBAgACBaQLC9DRqFREgQIAAAQIECHQT+H9ZGToT2q7hagAAAABJRU5ErkJggg=="
                                width={780.559} height={603.333}
                                alt="Signin Image"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>

    )
}