import { useEffect, useRef, useState, useCallback } from 'react';
import currencyFormatter from 'currency-formatter';
import Pagination from '@mui/material/Pagination';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TableSortLabel from '@mui/material/TableSortLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FA from "react-fontawesome";
import styles from "./product.module.scss";
import { debounce, Table, TableBody, Tooltip } from '@mui/material';
import { BoxFlex, ButtonAction } from '../../components/layout/Base';
import EditIcon from '@mui/icons-material/Edit';
import { Add, Delete, TableChart } from '@mui/icons-material';
import FormProduct from './FormProduct';
import { ProductContext } from '../../context/ProductContext';
import { API_GET_LIST_PRODUCT, API_GET_LIST_PROPERTY_GROUP } from '../../api/product';
import axiosCommon, { BASE_URL_API } from '../../api/axios';
import DeleteProduct from './components/DeleteProduct';
import { API_GET_LIST_CATEGORY } from '../../api/productCategory';
function Product() {

    const [products, setProducts] = useState({
        items: [],
        properties: []
    });
    const searchPropertyRef = useRef({});
    const [filter, setFilter] = useState({});
    const [propetyGroups, setPropetyGroups] = useState([]);
    const [categories, setCategories] = useState([]);
    const productRef = useRef({
        refresh: function (filter = {}) {
            axiosCommon.get(API_GET_LIST_PRODUCT, { params: filter })
                .then(function ({ data }) {
                    setProducts({
                        items: data.data.items,
                        properties: data.data.property
                    });
                    metaTags.current = data.data._meta;
                })
        }
    });
    const metaTags = useRef({
        currentPage: 1,
        pageCount: 1
    });
    useEffect(() => {
        productRef.current.refresh(filter);
    }, [filter]);
    useEffect(() => {
        axiosCommon.get(API_GET_LIST_PROPERTY_GROUP)
            .then(function ({ data }) {
                setPropetyGroups(data.result.data);
            })
        axiosCommon.get(API_GET_LIST_CATEGORY)
            .then(function ({ data }) {
                setCategories(data.result.data.items);
            })
    }, []);

    const debounceSearch = useCallback(debounce((nextvalue) => {
        setFilter((filterBefore) => {
            return {
                ...filterBefore,
                ...nextvalue
            }
        })
    }, 400));

    function handleOpenForm() {
        productRef.current.handleAdd();
    }

    function handleOpenFormUpdate(product_id) {
        productRef.current.handleUpdate(product_id);
    }
    function handleSearch(e) {
        debounceSearch({ s: e.target.value });
    }
    function handleChangePagination(event, value) {
        if (value === metaTags.current.currentPage) {
            return false;
        }
        setFilter((prevState) => {
            return {
                ...prevState,
                page: value
            }
        });
    }

    function handleChangeSearchPriorty(prioritySlug, priorityValue) {

        if (typeof searchPropertyRef.current[prioritySlug] == "undefined") {
            searchPropertyRef.current[prioritySlug] = [priorityValue[1]];
        }
        else {
            const index = searchPropertyRef.current[prioritySlug].indexOf(priorityValue[1]);
            if (index === -1) {
                searchPropertyRef.current[prioritySlug].push(priorityValue[1]);
            }
            else {
                searchPropertyRef.current[prioritySlug].splice(index, 1);
            }
        }
        const newSearchProprety = [];
        for (const property in searchPropertyRef.current) {
            newSearchProprety["filter_" + property] = searchPropertyRef.current[property].join(",");
        }
        debounceSearch(newSearchProprety);
    }
    return (
        <ProductContext.Provider value={productRef}>
            <div className={styles.wpProduct}>
                <h3 className={styles.title}>Danh sách sản phẩm</h3>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Sản Phẩm
                    </Link>
                    <Typography color="text.primary">Danh sách sản phẩm</Typography>
                </Breadcrumbs>
                <BoxFlex className={styles.boxTop} justifyContent="space-between" alignItems="center">
                    <div className={[styles.productFilter, styles.boxLeft].join(" ")}>
                        <TextField id="input-with" onChange={handleSearch} size='small' sx={{ my: 1 }} InputProps={{
                            startAdornment: <InputAdornment position="start">
                                <FA name='search' className={styles.icon} />
                            </InputAdornment>,
                        }} />
                        <FormControl sx={{ ml: 2, width: 200 }} className={[styles.filterItem].join(" ")} size="small">
                            <InputLabel id="demo-select-small">Danh Mục</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={filter.category_id ?? " "}
                                label="category_name"
                                onChange={(e) => {
                                    debounceSearch({ category_id: e.target.value })
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
                        {propetyGroups.map((value, index) => {
                            return (<FormControl key={value.id} sx={{ width: 150, ml: 2 }} className={[styles.filterItem].join(" ")}>
                                <InputLabel id="demo-multiple-checkbox-label">
                                    {value.property_name}
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    onChange={(e) => {
                                        handleChangeSearchPriorty(value.property_slug, e.target.value);
                                    }}
                                    value={[searchPropertyRef.current[value.property_slug] ?? []]}
                                    input={<OutlinedInput size='small' label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {
                                        value.product_property.map(item => {
                                            return (
                                                <MenuItem key={item.id} value={item.property_slug}>
                                                    <Checkbox checked={searchPropertyRef.current[value.property_slug]?.includes(item.property_slug) ?? false} />
                                                    <ListItemText primary={item.property_value} />
                                                </MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>)
                        })}
                    </div>
                    <div className={styles.boxRight}>
                        <Tooltip title="Thêm sản phẩm">
                            <Button onClick={handleOpenForm} variant="contained" color="primary" size="small">
                                <Add />
                            </Button>
                        </Tooltip>
                    </div>
                    <FormProduct />
                </BoxFlex>
                <div className={styles.tableProduct}>
                    <Table size='sm' style={{ width: "100%" }}>
                        <TableHead>
                            <TableRow hover>
                                <TableCell>
                                    Ảnh
                                </TableCell>
                                <TableCell width="20%">
                                    Tên Sản Phẩm
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Danh Mục
                                </TableCell>
                                <TableCell>
                                    Giá Bán
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                {
                                    products.properties.map((property) => {
                                        return (
                                            <TableCell key={property.id} width="10%">
                                                {property.property_name}
                                                <TableSortLabel
                                                    active={true}
                                                    direction={'asc'}
                                                ></TableSortLabel>
                                            </TableCell>
                                        )
                                    })
                                }
                                <TableCell>
                                    Hành Động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.items.map((product) => {
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <a href="" className={styles.productImage}>
                                                <img src={product.images[0] ? BASE_URL_API + "/" + product.images[0] : ""} />
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            {product.product_title}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p>
                                                    {product.category?.category_name}
                                                </p>
                                                <p className={styles.is_popular}>
                                                    {product.is_popular ? "(Sản Phẩm Nổi Bật)" : ""}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {currencyFormatter.format(product.price, { code: "VNĐ", precision: 0 })}
                                        </TableCell>
                                        {
                                            products.properties.map((property) => {
                                                const properties = product.properties[property.id] ?? [];
                                                const data = (properties.value?.map(item => {
                                                    return item.property_value;
                                                }));
                                                return (
                                                    <TableCell key={property.id}>
                                                        {data ? data.join(", ") : ""}
                                                    </TableCell>
                                                )
                                            })
                                        }
                                        <TableCell>
                                            <ButtonAction
                                                onClick={() => {
                                                    handleOpenFormUpdate(product.id);
                                                }}
                                                mx={10} type='info'>
                                                <EditIcon fontSize='small' />
                                            </ButtonAction>
                                            <ButtonAction type='danger'
                                                onClick={() => {
                                                    productRef.current.handleDelete(product.id)
                                                }}
                                            >
                                                <Delete fontSize='small' />
                                            </ButtonAction>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                {
                    metaTags.current.pageCount > 1 && (
                        <Pagination count={metaTags.current.pageCount} sx={{ py: 2, float: "right" }} page={metaTags.current.currentPage} onChange={handleChangePagination} />
                    )
                }
            </div >
            <DeleteProduct />
        </ProductContext.Provider>)
}

export default Product;