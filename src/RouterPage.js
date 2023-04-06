import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import LayoutLoading from "./components/layout/LayoutLoading";
import LoggedPage from "./components/layout/LoggedPage";
import Slider from "./pages/banner/Banner";
import { useEffect } from "react";
import { BarLoading } from "./components/layout/Loading";
import Product from "./pages/product/Product";
import ProductCategoryPage from "./pages/product/ProductCategoryPage";
import ProductPropertyPage from "./pages/product/ProductPropertyPage";
import ReactBeautiful from "./pages/test/ReactBeautiful";
// const Product = React.lazy(() => import('./pages/product/Product'));
// const ProductPropertyPage = React.lazy(() => import("./pages/product/ProductPropertyPage"));
// const ProductCategoryPage = React.lazy(() => import("./pages/product/ProductCategoryPage"));


function RouterPage() {

    return (
        <Router>
            <Routes>
                <Route path="/reactjs/product" index element={
                    // <React.Suspense fallback={<BarLoading />}>
                    <LoggedPage>
                        <Product />
                    </LoggedPage>
                    // </React.Suspense>
                } />
                <Route path="/reactjs/product/property" element={
                    // <React.Suspense fallback={<BarLoading />}>
                    <LoggedPage>
                        <ProductPropertyPage />
                    </LoggedPage>
                    // </React.Suspense>
                } />
                <Route path="/reactjs/product/category" element={
                    // <React.Suspense fallback={<BarLoading />}>
                    <LoggedPage>
                        <ProductCategoryPage />
                    </LoggedPage>
                    // </React.Suspense>
                }>

                </Route>
                <Route path="/reactjs/slider" element={
                    <Slider />
                } />
                <Route path="/reactjs/post/category" element={
                    <Slider />
                } />
                <Route path="/test" element={
                    <ReactBeautiful />
                } />
            </Routes>
        </Router>
    )
}

export default RouterPage;