import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TableSortLabel from '@mui/material/TableSortLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FA from "react-fontawesome";
import { debounce, Table, TableBody, Tooltip } from '@mui/material';
import { BoxFlex, ButtonAction, H3 } from '../../components/layout/Base';
import EditIcon from '@mui/icons-material/Edit';
import { Add, Delete } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "./productPropertyPage.module.scss";
import FormProductCategory from './components/FormProductCategory';
import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { API_GET_LIST_CATEGORY } from '../../api/productCategory';
import { ProductCategoryContext } from '../../context/ProductCategoryContext';
import axiosCommon from '../../api/axios';
import { getRevertSort, hasSort, getSort } from '../../common/base';
import DeleteProductCategory from './components/DeleteProductCategory';
import { LoggedPageContext } from '../../context/LoggedPageContext';

function ProductCategoryPage() {
    const ThemeLoggedPage = useContext(LoggedPageContext);
    const [categories, setCategories] = useState([]);
    const metaTags = useRef({
        currentPage: 1,
        pageCount: 1
    });
    const [filter, setFilter] = useState({
        sort: null,
    });
    const productCategoryRef = useRef({
        refresh: function (filter = {}) {
            axiosCommon.get(API_GET_LIST_CATEGORY, { params: filter })
                .then(function ({ data }) {
                    // console.log(data.result.data.items);
                    setCategories(data.result.data.items);
                    metaTags.current = data.result.data._meta;
                })
        }
    });

    const debounceSearch = useCallback(debounce((nextvalue) => {
        setFilter((filterBefore) => {
            return {
                ...filterBefore,
                search: nextvalue
            }
        })
    }, 400));

    function handleSearch(e) {
        debounceSearch(e.target.value)
    }
    useEffect(() => {
        productCategoryRef.current.refresh(filter);
    }, [filter]);

    function handleOpenDelete(id) {
        productCategoryRef.current.handleDelete(id);
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

    function setSort(key) {
        setFilter((filterBefore) => {
            return {
                ...filterBefore,
                sort: getRevertSort(key)
            }
        })
    }
    function getSort(key) {
        return
    }

    return (
        <ProductCategoryContext.Provider value={productCategoryRef}>
            <div className={styles.wpProductProperty}>
                <H3>Danh Sách Danh Mục Sản Phẩm</H3>
                <Breadcrumbs sx={{ py: 1 }} aria-label="breadcrumb" className={styles.breadcrumbs}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Sản Phẩm
                    </Link>
                    <Typography color="text.primary">Danh Sách Danh Mục Sản Phẩm</Typography>
                </Breadcrumbs>
                <BoxFlex className={styles.boxTop} justifyContent="space-between" alignItems="center">
                    <div className={[styles.productPropertyFilter, styles.boxLeft].join(" ")}>
                        <div className={[styles.productPropertySearchName, styles.filterItem].join(" ")}>
                            <TextField id="input-with" onChange={handleSearch} size='small' sx={{ my: 1 }} InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <FA name='search' className={styles.icon} />
                                </InputAdornment>,
                            }} />
                        </div>
                    </div>
                    <div className={styles.boxRight}>
                        <Tooltip title="Thêm sản phẩm" onClick={() => {
                            productCategoryRef.current.handleCreate();
                        }}>
                            <Button variant="contained" color="primary" size="small">
                                <Add />
                            </Button>
                        </Tooltip>
                    </div>
                </BoxFlex>
                <div className={styles.tableProductProperty}>
                    <Table size='sm' style={{ width: "100%" }}>
                        <TableHead>
                            <TableRow hover>
                                <TableCell>
                                    STT
                                </TableCell>
                                <TableCell width="35%">
                                    Tên Danh Mục
                                    <TableSortLabel
                                        onClick={() => {
                                            setSort(filter.sort, "property_name");
                                        }}
                                        active={hasSort("property_name", filter.sort)}
                                        direction={getSort("property_name", filter.sort)}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Ngày Tạo
                                    <TableSortLabel
                                        active={hasSort("created_at", filter.sort)}
                                        direction={getSort("created_at", filter.sort)}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Hành Động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((value, index) => {
                                return (
                                    <TableRow key={value.id}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {value.category_name}
                                        </TableCell>
                                        <TableCell>
                                            {value.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonAction
                                                onClick={() => productCategoryRef.current.handleUpdate(value.id)}
                                                mx={10} type='info'>
                                                <EditIcon fontSize='small' />
                                            </ButtonAction>
                                            <ButtonAction type='danger' onClick={() => productCategoryRef.current.handleDelete(value.id)}>
                                                <Delete fontSize='small' />
                                            </ButtonAction>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <FormProductCategory />
                    <DeleteProductCategory />
                </div>
                {
                    metaTags.current.pageCount > 1 && (
                        <Pagination count={metaTags.current.pageCount} sx={{ py: 2, float: "right" }} page={metaTags.current.currentPage} onChange={handleChangePagination} />
                    )
                }
            </div>
        </ProductCategoryContext.Provider>
    )
}

export default ProductCategoryPage;