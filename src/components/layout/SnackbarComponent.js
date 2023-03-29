import { Snackbar } from "@mui/material";
import { useContext } from "react";
import { useState } from "react"
import { LoggedPageContext } from "../../context/LoggedPageContext";

function SnackbarComponent() {
    const ThemeLoggedPageContext = useContext(LoggedPageContext);

    const [snackbar, setSnackbar] = useState({
        isShow: false,
        message: null
    });

    ThemeLoggedPageContext.current.snackbar = {
        close: handleClose,
        open: function ({ message }) {
            setSnackbar({
                isShow: true,
                message
            })
        }
    }

    function handleClose() {
        setSnackbar((prevState) => {
            return {
                ...prevState,
                isShow: false
            }
        })
    }
    return (
        <Snackbar
            open={snackbar.isShow}
            onClose={() => {
                handleClose();
            }}
            autoHideDuration={700}
            message={snackbar.message}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            key={"testing"}
        />
    )
}

export default SnackbarComponent;