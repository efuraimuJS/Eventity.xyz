import {useState} from "react";

const useAlert = () => {
    const [alert, setAlert] = useState([]);
    const [show, setShow] = useState(false);

    function showAlert(message) {
        setAlert(message);
        setShow(true);
    }

    function hideAlert() {
        setShow(false);
    }

    return {
        alert,
        show,
        showAlert,
        hideAlert
    };
}

export default useAlert