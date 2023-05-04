import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {Formik} from 'formik';
import * as Yup from 'yup';

import styles from '../../styles/SignIn.module.scss'
import Link from 'next/link'
import Image from "next/image";
import {AiFillGoogleCircle} from "react-icons/ai";

import {getSession, signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router'
import {AlertContext} from "../../context/AlertContext";

import AlertFlash from '../../components/global/AlertFlash'

export default function SignIn() {
    const {data: session} = useSession();
    const {addAlert, alerts} = useContext(AlertContext);

    // console.log(alerts)
    // console.log(session)

    const initialValues = {
        email: '',
        password: '',
    }

    const validateSchema = Yup.object({
        email: Yup.string().email('Insert a valid email').required('Required'),
        password: Yup.string().required("Required").min(6, 'Minimum of 6 characters'),
    })


    const router = useRouter()

    const onSubmitForm = async (values,
                                // {setSubmitting, resetForm}
    ) => {
        // e.preventDefault()
        // console.log(e.target.password.value, e.target.email.value)
        console.log(values)
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            })
            console.log(result)

            if (result.ok) {
                // resetForm()
                await router.replace('/').then(() => {
                    addAlert('Success! You have been authenticated and logged in.', 'success ',
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

    // Check if a user is signed in? Else Rerender the SignIn page

    // (async () => {
    //     if (session) {
    //
    //         // await router.replace('/').then(() => {
    //         //     addAlert(' You are already authenticated and logged in.', 'info ',
    //         //         'FYI! Just so you know!');
    //         // })
    //
    //     } else {
    //         // await addAlert(' Please enter your valid login credentials to access your account!', 'info ',
    //         //     'FYI! Just so you know!');
    //
    //     }
    // })()

    return (
        <>
            <div className={`${styles.masterContainer} d-flex`}>
                <div className={`${styles.signinContainer} position-absolute`}>
                    <Row style={{width: "inherit"}} className={styles.signinContainer}>
                        <Col className={styles.signinContainer} sm={`12`} md="5">
                            <div>
                                <Link href={`/`}>
                                    <Image
                                        src="/logo-no-background_web.svg"
                                        alt="Eventity.xyz"
                                        width={150}
                                        height={37}
                                    />
                                </Link>
                            </div>
                            <div id={styles.formBoxContainer} className={`mx-3 pt-3`}>

                                <AlertFlash/>
                                <h1>Sign into your <br/> account</h1>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validateSchema}
                                    onSubmit={
                                        (values, {
                                            setSubmitting,
                                            resetForm
                                        }) => onSubmitForm(values
                                            // , {setSubmitting, resetForm}
                                        )}
                                >
                                    {(
                                        {
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            values,
                                            touched,
                                            isValid,
                                            errors,
                                        }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3 position-relative">
                                                <Form.Control type="email"
                                                              className="form-control"
                                                              id="email"
                                                              name="email"
                                                              value={values.email}
                                                              onChange={handleChange}
                                                              isValid={touched.email && !errors.email}
                                                              isInvalid={!!errors.email}
                                                              placeholder="name@example.com">

                                                </Form.Control>
                                                <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback tooltip
                                                                       type={`invalid`}>{errors?.email}</Form.Control.Feedback>

                                                <Form.Label htmlFor="email">Email address</Form.Label>
                                            </div>
                                            <div className="form-floating position-relative">
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

                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <div className="d-grid pt-3">
                                                <button
                                                    className="btn btn-primary btn-lg"
                                                    type="submit">Log in
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                    }

                                </Formik>
                                <div className={`position-relative`}>
                                    <hr className={`mt-5 pb-0`}/>
                                    <b>
                                        <p style={{fontSize: "21px", zIndex: "999"}}
                                           className={`pb-2 position-absolute top-50 start-50 translate-middle`}> or</p>
                                    </b>
                                </div>
                                <div className="d-grid pt-3">
                                    <button className="btn btn-primary btn-lg" type="button">Email me a Magic.link
                                    </button>
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
                                src={`/images/eventity_signin.avif`}
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