import React from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import LoggedPage from "./components/layout/LoggedPage";
import Product from "./pages/product/Product";


function RouterPage() {
    return (<Router>
        <Routes>
            <Route path="/" element={<LoggedPage>
                <Product/>
            </LoggedPage>} />
            <Route path="/setting" element={<LoggedPage>
                Setting
            </LoggedPage>} />
        </Routes>
    </Router>)
}

export default RouterPage;