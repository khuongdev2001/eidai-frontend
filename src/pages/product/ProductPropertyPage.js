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
import { Table, TableBody, Tooltip } from '@mui/material';
import { BoxFlex, ButtonAction, H3 } from '../../components/layout/Base';
import EditIcon from '@mui/icons-material/Edit';
import { Add, Delete } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "./productPropertyPage.module.scss";
import FormProductProperty from './FormProductProperty';

function ProductPropertyPage() {
    return (<div className={styles.wpProductProperty}>
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
                    <TextField id="input-with" size='small' sx={{ my: 1 }} InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <FA name='search' className={styles.icon} />
                        </InputAdornment>,
                    }} />
                </div>
            </div>
            <div className={styles.boxRight}>
                <Tooltip title="Thêm sản phẩm">
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
                                active={true}
                                direction={'asc'}
                            ></TableSortLabel>
                        </TableCell>
                        <TableCell>
                            Ngày Tạo
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
                    {[1, 2, 3, 4, 5, 5, 2, 3, 3, 3].map((value) => {
                        return (
                            <TableRow>
                                <TableCell>
                                    {value}
                                </TableCell>
                                <TableCell>
                                    Kiểu lát
                                </TableCell>
                                <TableCell>
                                    12/10/2022
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
            <FormProductProperty/>
        </div>
    </div>)
}

export default ProductPropertyPage;