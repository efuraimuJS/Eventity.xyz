import React, { createContext, useState } from 'react';

export const AlertContext = createContext({});

const AlertContextProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    const [show, setShow] = useState(false);

    const addAlert = (message, type = 'success') => {
        let valueSets = new Set()
        valueSets.add({ message, type })
        setAlerts([...valueSets]);
        setShow(true)
    };

    const removeAlert = (index) => {
        setAlerts(alerts.filter((alert, i) => i !== index));
        setShow(false)
    };

    return (
        <AlertContext.Provider value={{ show, alerts, addAlert, removeAlert }}>
            {children}
        </AlertContext.Provider>
    );
}
export default AlertContextProvider;
