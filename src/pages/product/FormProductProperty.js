import { useState, useRef, useContext } from "react";
import { TextField } from "@mui/material";
import { ProductPropertyContext } from "../../context/ProductPropertyContext";
import { H3 } from "../../components/layout/Base";
import Modal from "../../components/layout/Modal";
import ProductPropertyValidate, { schemas } from "./validates/FormProductProperty";
import axiosCommon from "../../api/axios";
import { API_CREATED_PROPERTY, API_UPDATED_PROPERTY, API_VIEW_PROPERTY } from "../../api/productProperty";
import { LoggedPageContext } from '../../context/LoggedPageContext';

function FormProductProperty() {
    const [isShow, setIshow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [property, setProperty] = useState(schemas);
    const [errors, setErrors] = useState({});
    const propertyRef = useRef({ id: null, action: "create" });
    const ThemeProductPropertyContext = useContext(ProductPropertyContext);
    const ThemeLoggedPageContext = useContext(LoggedPageContext);

    ThemeProductPropertyContext.current.handleUpdate = function (id) {
        setProperty(schemas);
        propertyRef.current.id = id;
        propertyRef.current.action = "update";
        setIshow(true);
        handleView();
    }
    ThemeProductPropertyContext.current.handleCreate = function () {
        setProperty(schemas);
        propertyRef.current.action = "create";
        setIshow(true);
    }

    function handleSetValue(key, value) {
        setProperty({
            ...property,
            [key]: value
        });
    }

    function handleView() {
        axiosCommon.get(API_VIEW_PROPERTY, { params: { id: propertyRef.current.id } }).then(({ data }) => {
            setProperty(data.data[0]);
        })
    }

    function handleCreate() {
        axiosCommon.post(API_CREATED_PROPERTY, property).then(() => {
            clearAfterSubmit();
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Tạo Thuộc Tính Thành Công"
            })
        })
    }

    function handleUpdate() {
        axiosCommon.post(API_UPDATED_PROPERTY, property, { id: propertyRef.current }).then(() => {
            clearAfterSubmit();
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Cập Nhật Thuộc Tính Thành Công"
            })
        })
    }

    function clearAfterSubmit() {
        ThemeProductPropertyContext.current.refresh();
        setIshow(false);
        setIsLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = ProductPropertyValidate(property);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        setIsLoading(true);
        switch (propertyRef.current.action) {
            case "create":
                handleCreate();
                break;
            case "update":
                handleUpdate()
                break;
        }
    }

    return (<Modal
        onSubmit={handleSubmit}
        onClose={() => setIshow(false)}
        isLoading={isLoading}
        isShow={isShow} size="xl" position="center">
        <H3 py={20}>Thêm Thuộc Tính Sản Phẩm</H3>
        <form onSubmit={handleSubmit}>
            <TextField
                onChange={(e) => { handleSetValue("property_name", e.target.value) }}
                id="outlined-basic"
                label="Tên Thuộc Tính Sản Phẩm"
                variant="outlined"
                fullWidth
                size="small"
                error={Boolean(errors["property_name"])}
                helperText={errors["property_name"] || ""}
                value={property.property_name}
            />
        </form>
    </Modal>)
}

export default FormProductProperty;