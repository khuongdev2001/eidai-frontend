import TableCell from '@mui/material/TableCell';
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
import FormProductProperty from './FormProductProperty';
import { useEffect, useState, useRef, useCallback } from 'react';
import { API_GET_LIST_PROPERTY } from '../../api/productProperty';
import DeleteProductProperty from './DeleteProductProperty';
import { ProductPropertyContext } from '../../context/ProductPropertyContext';
import axiosCommon from '../../api/axios';
import { getRevertSort, hasSort, getSort } from '../../common/base';

function ProductPropertyPage() {

    const [properties, setProperties] = useState([]);
    const [filter, setFilter] = useState({
        sort: null
    });
    const productPropertyRef = useRef({
        refresh: function (filter = {}) {
            axiosCommon.get(API_GET_LIST_PROPERTY, { params: filter })
                .then(function ({ data }) {
                    // console.log(data.result.data.items);
                    setProperties(data.result.data.items);
                })
        }
    });

    const debounceSearch = useCallback(debounce((nextvalue) => {
        setFilter((filterBefore) => {
            return {
                ...filterBefore,
                property_name: nextvalue
            }
        })
    }, 400));

    function handleSearch(e) {
        debounceSearch(e.target.value)
    }
    useEffect(() => {
        console.log(filter);
        productPropertyRef.current.refresh(filter);
    }, [filter]);

    function handleOpenDelete(id) {
        productPropertyRef.current.handleDelete(id);
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
        <ProductPropertyContext.Provider value={productPropertyRef}>
            <div className={styles.wpProductProperty}>
                <H3>Danh Sách Thuộc Tính Sản Phẩm</H3>
                <Breadcrumbs sx={{ py: 1 }} aria-label="breadcrumb" className={styles.breadcrumbs}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Sản Phẩm
                    </Link>
                    <Typography color="text.primary">Danh Sách Thuộc Tính Sản Phẩm</Typography>
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
                            productPropertyRef.current.handleCreate();
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
                                    Tên Thuộc Tính
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
                            {properties.map((value, index) => {
                                return (
                                    <TableRow key={value.id}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {value.property_name}
                                        </TableCell>
                                        <TableCell>
                                            {value.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <ButtonAction
                                                onClick={() => productPropertyRef.current.handleUpdate(value.id)}
                                                mx={10} type='info'>
                                                <EditIcon fontSize='small' />
                                            </ButtonAction>
                                            <ButtonAction type='danger' onClick={() => productPropertyRef.current.handleDelete(value.id)}>
                                                <Delete fontSize='small' />
                                            </ButtonAction>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <FormProductProperty />
                    <DeleteProductProperty />
                </div>
            </div>
        </ProductPropertyContext.Provider>
    )
}

export default ProductPropertyPage;