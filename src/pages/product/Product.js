import { useEffect, useRef, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
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
import { Table, TableBody, Tooltip } from '@mui/material';
import { BoxFlex, ButtonAction } from '../../components/layout/Base';
import EditIcon from '@mui/icons-material/Edit';
import { Add, Delete } from '@mui/icons-material';
import FormProduct from './FormProduct';
import { ProductContext } from '../../context/ProductContext';
import { API_GET_LIST_PRODUCT } from '../../api/product';
import axios from 'axios';
function Product() {

    const [products, setProducts] = useState([]);
    const productRef = useRef({});
    useEffect(() => {
        axios.get(API_GET_LIST_PRODUCT)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    },[]);
    function handleOpenForm() {
        productRef.current.setIshow(true);
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
                        <div className={[styles.productSearchName, styles.filterItem].join(" ")}>
                            <FA name='search' className={styles.icon} />
                            <TextField id="input-with" size='small' />
                        </div>
                        {["Kiểu lát", "Loại sàn", "Loại gỗ"].map((value, index) => {
                            return (<FormControl key={index} sx={{ width: 150, ml: 2 }} className={[styles.filterItem].join(" ")}>
                                <InputLabel id="demo-multiple-checkbox-label">{value}</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={[]}
                                    input={<OutlinedInput size='small' label="Tag" />}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    <MenuItem value="gỗ">
                                        <Checkbox />
                                        <ListItemText primary={"Gỗ"} />
                                    </MenuItem>
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
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>
                                    Ảnh
                                </TableCell>
                                <TableCell width="35%">
                                    Tên Sản Phẩm
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Giá Bán
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Kiểu Lát
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Loại Sàn
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Loại Gỗ
                                    <TableSortLabel
                                        active={true}
                                        direction={'asc'}
                                    ></TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Hành Động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(() => {
                                return (
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                inputProps={{
                                                    'aria-label': 'select all desserts',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <a href="" className={styles.productImage}>
                                                <img src='https://eidai.com.vn/img/63c0d57d33da1.jpg' />
                                            </a>
                                        </TableCell>
                                        <TableCell>
                                            Sàn gỗ kỹ thuật - Gỗ óc chó 1P (Bản rộng 90mm) (MRBS-WAL-C)
                                        </TableCell>
                                        <TableCell>
                                            Thẳng
                                        </TableCell>
                                        <TableCell>
                                            Mộc, Thủy, Hỏa
                                        </TableCell>
                                        <TableCell>
                                            trơn, bóng
                                        </TableCell>
                                        <TableCell>
                                            trơn, bóng
                                        </TableCell>
                                        <TableCell>
                                            <ButtonAction mx={10} type='info'>
                                                <EditIcon fontSize='small' />
                                            </ButtonAction>
                                            <ButtonAction type='danger'>
                                                <Delete fontSize='small' />
                                            </ButtonAction>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div >
        </ProductContext.Provider>)
}

export default Product;