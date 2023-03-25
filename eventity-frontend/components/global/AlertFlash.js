import React, {useContext} from 'react';

import {AlertContext} from '../../context/AlertContext'
import styles from "../../styles/SignIn.module.scss";
import Alert from "react-bootstrap/Alert";

const AlertFlash = () => {
    const {alerts, removeAlert} = useContext(AlertContext)

    return (
        <>
            {
                alerts?.map((alert, index) => (
                    <Alert className={styles.authAlerts} variant={`${alert.type}`}
                           onClose={() => removeAlert(index)} dismissible>
                        <Alert.Heading>{`${alert.header}`}</Alert.Heading>
                        <ul>
                            <div dangerouslySetInnerHTML={{__html: `<li>&#8226; ${alert.message}</li>`}}/>
                        </ul>
                    </Alert>
                ))
            }
        </>
    )
}

export default AlertFlash
