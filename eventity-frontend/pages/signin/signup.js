import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/SignIn.module.scss'
import Link from 'next/link'
import Image from "next/image";
import {AiFillGoogleCircle} from "react-icons/ai";

import {getSession, signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router'
import React, {useContext, useState} from "react";

import * as Yup from 'yup';
import axios from "axios";
import {Formik} from 'formik';
import Form from 'react-bootstrap/Form';

import AlertFlash from "../../components/global/AlertFlash";
import {AlertContext} from "../../context/AlertContext";


export default function SignUp() {
    const [email, setEmail] = useState('');
    const {data: session} = useSession()
    const {alerts, addAlert} = useContext(AlertContext);

    const router = useRouter()
    console.log(alerts)

    const initialValues = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }

    const validateSchema = Yup.object({
        username: Yup.string().required('Required').max(15, 'Must be 15 characters or less').min(6, 'Minimum of 6 characters'),
        email: Yup.string().email('Insert a valid email').required('Required'),
        password: Yup.string().required("Required").min(6, 'Minimum of 6 characters'),
        passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null, "Passwords must match"]).required('Required').min(6, 'Minimum of 6 characters')
    })

    const onSubmitForm = async (values, {setSubmitting, resetForm}) => {

        await axios
            .post('http://localhost:1337/api/auth/local/register', values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(async response => {
                // Handle success.
                const message = `Please check your email (${values.email}) to confirm your account.`;
                setEmail(values.email)

                resetForm();

                await router.replace('/signin').then(() => {
                    addAlert(message, 'success ',
                        'Congratulations! You have successfully registered for an Eventity Account');
                })


            })
            .catch(error => {
                // Handle error.
                console.log(error)
                // console.log(error.response.data.error.message)
                if (!error.response?.data.error.message) {
                    addAlert('Authentication failed. Please check your username and password.'
                        , 'danger ',
                        'Oh snap! You got an error!');
                } else {
                    const message = error.response?.data.error.message
                    addAlert(message,
                        'danger ',
                        'Oh snap! You got an error!');
                }
                // console.log('An error occurred:', error.response);
            }).finally(() => {
                setSubmitting(false)
            });
    }


    return (
        <>
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
                                <AlertFlash/>
                                <h1>Create your <br/> account</h1>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validateSchema}
                                    onSubmit={(values, {
                                        setSubmitting,
                                        resetForm
                                    }) => onSubmitForm(values,
                                        {setSubmitting, resetForm}
                                    )}>
                                    {
                                        ({
                                             isSubmitting,
                                             isValid,
                                             handleSubmit,
                                             handleChange,
                                             handleBlur,
                                             values,
                                             touched,
                                             errors
                                         }) => (
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <div className="form-floating mb-1 position-relative">
                                                    <Form.Control type="text"
                                                                  className="form-control"
                                                                  id="username"
                                                                  name="username"
                                                                  placeholder="John Doe"
                                                                  value={values.username}
                                                                  onChange={handleChange}
                                                                  isValid={touched.username && !errors.username}
                                                                  isInvalid={!!errors.username}>

                                                    </Form.Control>
                                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                    <Form.Control.Feedback tooltip
                                                                           type={`invalid`}>{errors?.username}</Form.Control.Feedback>
                                                    <Form.Label htmlFor="username">Username</Form.Label>
                                                </div>


                                                <div className="form-floating mb-1 position-relative">
                                                    <Form.Control type="email"
                                                                  className="form-control"
                                                                  id="email"
                                                                  name="email"
                                                                  placeholder="Email Address"
                                                                  value={values.email}
                                                                  onChange={handleChange}
                                                                  isValid={touched.email && !errors.email}
                                                                  isInvalid={!!errors.email}>

                                                    </Form.Control>
                                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                    <Form.Control.Feedback tooltip
                                                                           type={`invalid`}>{errors?.email}</Form.Control.Feedback>

                                                    <Form.Label htmlFor="email">Email address</Form.Label>
                                                </div>
                                                <div className="form-floating mb-1 position-relative">
                                                    <Form.Control type="password"
                                                                  className="form-control"
                                                                  id="password"
                                                                  name="password"
                                                                  placeholder="Password"
                                                                  value={values.password}
                                                                  onChange={handleChange}
                                                                  isValid={touched.password && !errors.password}
                                                                  isInvalid={!!errors.password}>

                                                    </Form.Control>
                                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                    <Form.Control.Feedback tooltip
                                                                           type={`invalid`}>{errors?.password}</Form.Control.Feedback>

                                                    <Form.Label htmlFor="password">Password</Form.Label>
                                                </div>
                                                <div className="form-floating mb-1 position-relative">
                                                    <Form.Control type="password"
                                                                  className="form-control"
                                                                  id="passwordConfirm"
                                                                  name="passwordConfirm"
                                                                  placeholder="passwordConfirm"
                                                                  value={values.passwordConfirm}
                                                                  onChange={handleChange}
                                                                  isValid={touched.passwordConfirm && !errors.passwordConfirm}
                                                                  isInvalid={!!errors.passwordConfirm}>

                                                    </Form.Control>
                                                    <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                    <Form.Control.Feedback tooltip
                                                                           type={`invalid`}>{errors?.passwordConfirm}</Form.Control.Feedback>

                                                    <Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
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
                                    <button className="btn btn-primary btn-lg" type="submit"
                                            onClick={async (e) => {
                                                e.preventDefault();

                                                try {
                                                    const result = await signIn('google')
                                                    console.log(result)

                                                    if (result.ok) {
                                                        // resetForm()
                                                        await router.replace('/').then(async () => {
                                                            await addAlert('Success! You have been authenticated and logged in.', 'success ',
                                                                'Hey, Welcome back to Eventity');
                                                        })

                                                    } else {
                                                        addAlert('Authentication failed. Please check your username and password.'
                                                            , 'danger ',
                                                            'Oh snap! You got an error!');
                                                    }
                                                } catch (e) {

                                                } finally {
                                                    // setSubmitting(false)
                                                }
                                                // alert('Credential is not valid');
                                            }
                                            }

                                    >
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
                                src={`/images/eventity_signup.avif`}
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

export async function getServerSideProps({req, query: {slug}}) {

    const session = await getSession({req})

    if (session) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }


    return {
        props: {},
    };
}