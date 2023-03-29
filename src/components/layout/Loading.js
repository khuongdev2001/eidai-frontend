import { LinearProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import { LoggedPageContext } from "../../context/LoggedPageContext";

function Loadding() {
    const [isShow, setIshow] = useState(true);
    const ThemeLoggedPage = useContext(LoggedPageContext);
    ThemeLoggedPage.current.loadingOpen = function () {
        setIshow(true);
    }
    ThemeLoggedPage.current.Loadingclose = function () {
        setIshow(false);
    }
    if (!isShow) {
        return <>

        </>;
    }
    return (<div style={{
        position: "absolute",
        top: 0,
        width: "100%"
    }}>
        <LinearProgress></LinearProgress>
    </div>);
}

function BarLoading() {
    let location = useLocation();
    useEffect(() => {
        nprogress.start();
        nprogress.done();
    }, [location.pathname]);

    return "";
}

export { BarLoading }

export default Loadding;