import { useContext, useEffect, useRef, useState } from 'react';
import styles from "./formProduct.module.scss";
import { BoxFlex, H3, H4 } from "../../components/layout/Base";
import Modal from "../../components/layout/Modal";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import UploadImage from './UploadImage';
import ProductProperty from './ProductProperty';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ProductContext } from '../../context/ProductContext';
import FormProductValidate, { schema } from "./validates/FormProductValidate";
import { schemas as schemaCategory } from "./validates/FormProductCategory";
import axiosCommon from '../../api/axios';
import { API_GET_LIST_CATEGORY } from '../../api/productCategory';
import { API_CREATE_MANY_PRODUCT_PROPERTY, API_GET_LIST_PROPERTY } from '../../api/productProperty';
import ProductEditor from './components/ProductEditor';
import { API_CREATE_PRODUCT, API_UPDATE_PRODUCT, API_GET_VIEW_PRODUCT } from '../../api/product';
import { LoggedPageContext } from '../../context/LoggedPageContext';
import currencyFormatter from "currency-formatter";

function FormProduct() {
    const ThemeProductContext = useContext(ProductContext);
    const ThemeLoggedPageContext = useContext(LoggedPageContext);
    const [isShow, setIshow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(schema);
    const [categories, setCategories] = useState([schemaCategory]);
    const [errors, setErrors] = useState({});
    const productRef = useRef({
        action: "create",
        product_id: null,
        product_properties: {}
    })
    ThemeProductContext.current.handleAdd = function () {
        setIshow(true);
        productRef.current.action = "create";
    };
    ThemeProductContext.current.handleUpdate = function (product_id) {
        setIshow(true);
        productRef.current.action = "update";
        productRef.current.product_id = product_id;
        axiosCommon.get(API_GET_VIEW_PRODUCT, { params: { id: product_id } }).then(({ data }) => {
            const resultProduct = data.data[0];
            setProduct(resultProduct);
        })
    };
    useEffect(() => {
        axiosCommon.get(API_GET_LIST_CATEGORY).then(({ data }) => {
            setCategories(data.result.data.items);
        })
    }, []);

    useEffect(() => {
        console.log(product);
    }, [product]);

    function handleSetField(key, value) {
        setProduct((prevState) => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }

    function handleUpdate() {
        axiosCommon.post(API_UPDATE_PRODUCT, product).then(({ data }) => {
            productRef.current.dataProperty.product_id = data.result.data.id;
            axiosCommon.post(API_CREATE_MANY_PRODUCT_PROPERTY, productRef.current.dataProperty)
                .then(({ data }) => {
                    ThemeLoggedPageContext.current.snackbar.open({
                        message: "Cập Nhật Sản Phẩm Thành Công"
                    })
                    clearAfterSubmit();
                })
        })
    }

    function handleCreate() {
        axiosCommon.post(API_CREATE_PRODUCT, product).then(({ data }) => {
            productRef.current.dataProperty.product_id = data.result.data.id;
            axiosCommon.post(API_CREATE_MANY_PRODUCT_PROPERTY, productRef.current.dataProperty)
                .then(({ data }) => {
                    ThemeLoggedPageContext.current.snackbar.open({
                        message: "Tạo Sản Phẩm Thành Công"
                    })
                    clearAfterSubmit();
                })
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = FormProductValidate(product);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        setIsLoading(true);
        switch (productRef.current.action) {
            case "create":
                handleCreate();
                break;
            case "update":
                handleUpdate()
                break;
        }
    }

    function clearAfterSubmit() {
        setIshow(false);
        setIsLoading(false);
        setProduct(schema);
        setErrors({});
        ThemeProductContext.current.refresh();
    }

    function handleSetCurrency(event) {
        if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
            event.preventDefault();
            return false;
        }
        return true;
    }




    return (<Modal isLoading={isLoading} isShow={isShow} onSubmit={handleSubmit} onClose={clearAfterSubmit} size="lg" position="center">
        <H3>
            {productRef.current.action === "create" ? "Thêm Sản Phẩm" : "Cập Nhật Sản Phẩm"}
        </H3>
        <form className={styles.formProduct}>
            <TextField

                size="small"
                fullWidth
                id="outlined-disabled"
                label="Tên sản phẩm"
                value={product.product_title}
                error={Boolean(errors["product_title"])}
                helperText={errors["product_title"] || ""}
                sx={{ mb: 1 }}
                onChange={(e) => {
                    handleSetField("product_title", e.target.value);
                }}
            />
            <BoxFlex alignItems="center">
                <FormControl sx={{ mr: 5 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Giá Bán</InputLabel>
                    <Input
                        onKeyPress={handleSetCurrency}
                        onChange={(e) => {
                            handleSetField("price", Number(e.target.value.replaceAll(",", "")));
                        }}
                        id="standard-adornment-amount"
                        value={currencyFormatter.format(product.price, { code: 'VNĐ', decimal: 0, precision: 0 })}
                        error={Boolean(errors["price"])}
                        helperText={errors["price"] || ""}
                        endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
                    />
                </FormControl>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={Boolean(product.status)} onChange={(e) => {
                        handleSetField("status", Number(!product.status));
                    }} />} label="Sản phẩm hoàn thành" />
                </FormGroup>
                <FormControl sx={{ width: 200 }} className={[styles.filterItem].join(" ")} size="small">
                    <InputLabel id="demo-select-small">Danh Mục</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="category_name"
                        value={product.category_id ?? " "}
                        error={Boolean(errors["category_id"])}
                        helperText={errors["category_id"] || ""}
                        onChange={(e) => {
                            handleSetField("category_id", e.target.value);
                        }}
                    >
                        <MenuItem value={" "}>Tất Cả</MenuItem>
                        {
                            categories.map((category) => {
                                return (
                                    <MenuItem key={category.id} value={category.id}>{category.category_name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </BoxFlex>
            <div className={styles.box}>
                <H4>Ảnh Sản Phẩm</H4>
                <UploadImage product={product} setProduct={setProduct} />
            </div>
            <div className={styles.box}>
                <H4 py={10}>Thuộc Tính Sản Phẩm</H4>
                <ProductProperty productRef={productRef} />
            </div>
            <div className={[styles.productShortDescription, styles.box].join(" ")}>
                <H4 className={styles.lableField}>Mô tả ngắn</H4>
                <ProductEditor product={product} setProduct={setProduct} field="product_content" />
            </div>
            <div className={[styles.productShortDescription, styles.box].join(" ")}>
                <H4 className={styles.lableField}>Mô tả chi tiết</H4>
                <ProductEditor product={product} setProduct={setProduct} field="product_excerpt" />
            </div>
        </form>
    </Modal>)
}

export default FormProduct;