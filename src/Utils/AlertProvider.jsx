import { createContext, useContext, useState } from "react";
import AlertPopup from "../Components/core/Popup/AlertPopup.jsx";
import PropTypes from "prop-types";

AlertProvider.propTypes={
    children: PropTypes.any,
}

const AlertContext = createContext();

// Custom Provider for Alerts
export function AlertProvider({ children }) {
    const [alert, setAlert] = useState(null);

    const showAlert = (title, description, onClose, onContinue,) => {
        setAlert({
            title,
            description,
            onClose: () => {
                setAlert(null);
                if (onClose) onClose();
            },
            ...(onContinue && {
                onContinue: () => {
                    setAlert(null);
                    onContinue();
                },
            }),
        });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && <AlertPopup alert={alert} />}
        </AlertContext.Provider>
    );
}

// Custom Hook to Use Alerts
export function useAlert() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
}