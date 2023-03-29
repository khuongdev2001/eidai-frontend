import { useState, useRef, useContext } from "react";
import { TextField } from "@mui/material";
import { ProductCategoryContext } from "../../../context/ProductCategoryContext";
import { H3 } from "../../../components/layout/Base";
import Modal from "../../../components/layout/Modal";
import ProductCategoryValidate, { schemas } from "../validates/FormProductCategory";
import axiosCommon from "../../../api/axios";
import { API_CREATED_CATEGORY, API_UPDATED_CATEGORY, API_VIEW_CATEGORY } from "../../../api/productCategory";
import { LoggedPageContext } from '../../../context/LoggedPageContext';

function FormProductCategory() {
    const [isShow, setIshow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState(schemas);
    const [errors, setErrors] = useState({});
    const categoryRef = useRef({ id: null, action: "create" });
    const ThemeProductCategoryContext = useContext(ProductCategoryContext);
    const ThemeLoggedPageContext = useContext(LoggedPageContext);

    ThemeProductCategoryContext.current.handleUpdate = function (id) {
        setCategory(schemas);
        categoryRef.current.id = id;
        categoryRef.current.action = "update";
        setIshow(true);
        handleView();
    }
    ThemeProductCategoryContext.current.handleCreate = function () {
        setCategory(schemas);
        categoryRef.current.action = "create";
        setIshow(true);
    }

    function handleSetValue(key, value) {
        setCategory({
            ...category,
            [key]: value
        });
    }

    function handleView() {
        axiosCommon.get(API_VIEW_CATEGORY, { params: { id: categoryRef.current.id } }).then(({ data }) => {
            setCategory(data.data[0]);
        })
    }

    function handleCreate() {
        axiosCommon.post(API_CREATED_CATEGORY, category).then(() => {
            clearAfterSubmit();
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Thêm Danh Mục Thành Công"
            })
        })
    }

    function handleUpdate() {
        axiosCommon.post(API_UPDATED_CATEGORY, category, { id: categoryRef.current }).then(() => {
            clearAfterSubmit();
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Cập Nhật Danh Mục Thành Công"
            })
        })
    }

    function clearAfterSubmit() {
        ThemeProductCategoryContext.current.refresh();
        setIshow(false);
        setIsLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = ProductCategoryValidate(category);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        setIsLoading(true);
        switch (categoryRef.current.action) {
            case "create":
                handleCreate();
                break;
            case "update":
                handleUpdate()
                break;
        }
    }

    return (<Modal
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onClose={() => setIshow(false)}
        isShow={isShow} size="xl" position="center">
        <H3 py={20}>Thêm Danh Mục Sản Phẩm</H3>
        <form onSubmit={handleSubmit}>
            <TextField
                onChange={(e) => { handleSetValue("category_name", e.target.value) }}
                id="outlined-basic"
                label="Tên Danh Mục Sản Phẩm"
                variant="outlined"
                fullWidth
                size="small"
                error={Boolean(errors["category_name"])}
                helperText={errors["category_name"] || ""}
                value={category.category_name}
            />
        </form>
    </Modal>)
}

export default FormProductCategory;