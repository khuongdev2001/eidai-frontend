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
import { Table, TableBody, Tooltip } from '@mui/material';
import { BoxFlex, ButtonAction, H3 } from '../../components/layout/Base';
import EditIcon from '@mui/icons-material/Edit';
import { Add, Delete } from '@mui/icons-material';
import styles from "./banner.module.scss";
import { BoxThumbnail } from '../../components/layout/List';
import InputAdornment from '@mui/material/InputAdornment';
import FormBanner from './components/FormBanner';

function Banner() {
    return (<div className={styles.wpBanner}>
        <H3>Danh sách banner</H3>
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumbs}>
            <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Banner
            </Link>
            <Typography color="text.primary">Danh sách banner</Typography>
        </Breadcrumbs><BoxFlex className={styles.boxTop} justifyContent="space-between" alignItems="center">
            <div className={[styles.productFilter, styles.boxLeft].join(" ")}>
                <div className={[styles.productSearchName, styles.filterItem].join(" ")}>
                    <TextField id="input-with" size='small' InputProps={{
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
        <div className={styles.tableBanner}>
            <Table size='sm' style={{ width: "100%" }}>
                <TableHead>
                    <TableRow hover>
                        <TableCell>
                            STT
                        </TableCell>
                        <TableCell>
                            Ảnh Banner
                        </TableCell>
                        <TableCell width="35%">
                            Tên Banner
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
                                    <BoxThumbnail href="" className={styles.bannerImage}>
                                        <img src='https://eidai.com.vn/img//main_img_01.jpg' />
                                    </BoxThumbnail>
                                </TableCell>
                                <TableCell>
                                    Banner sự kiện ngày lễ quốc khánh
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
            <FormBanner/>
        </div>
    </div>)
}

export default Banner;