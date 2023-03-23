import React from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import LoggedPage from "./components/layout/LoggedPage";
import Product from "./pages/product/Product";
import Slider from "./pages/banner/Banner";
import ProductPropertyPage from "./pages/product/ProductPropertyPage";


function RouterPage() {
    return (<Router>
        <Routes>
            <Route path="/" element={<LoggedPage>
                <Product />
            </LoggedPage>} />
            <Route path="/product/property" element={<LoggedPage>
                <ProductPropertyPage />
            </LoggedPage>} />
            <Route path="/slider" element={<LoggedPage>
                <Slider />
            </LoggedPage>} />
            <Route path="/post/category" element={<LoggedPage>
                <Slider />
            </LoggedPage>} />
        </Routes>
    </Router>)
}

export default RouterPage;