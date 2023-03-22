import styles from "./formProduct.module.scss";
import { BoxFlex, H3 } from "../../components/layout/Base";
import Modal from "../../components/layout/Modal";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

function FormProduct() {
    return (<Modal isShow={true} size="lg" position="center">
        <H3>Thêm Sản Phẩm</H3>
        <form className={styles.formProduct}>
            <TextField
                size="small"
                fullWidth
                id="outlined-disabled"
                label="Tên sản phẩm"
                defaultValue="Hello World"
                sx={{ mb: 1 }}
            />
            <BoxFlex alignItems="center">
                <FormControl sx={{ mr: 5 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Giá Bán</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
                    />
                </FormControl>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Sản phẩm hoàn thành" />
                </FormGroup>
            </BoxFlex>
        </form>
    </Modal>)
}

export default FormProduct;