import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import styles from "./productProperty.module.scss";
import { Box, Chip, IconButton, InputAdornment } from '@mui/material';
import { BoxFlex } from '../../components/layout/Base';
import { Delete } from '@mui/icons-material';
import Divider from '@mui/material/Divider';

function ProductProperty() {
    return (<div>
        <FormControl sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Thuộc tính</InputLabel>
            <Select
                size='small'
                sx={{ width: 230 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Age"
            >
                <MenuItem value={10}>Kiểu Lác</MenuItem>
                <MenuItem value={20}>Loại Sàn</MenuItem>
                <MenuItem value={30}>Loại Gỗ</MenuItem>
            </Select>
        </FormControl>
        <Divider sx={{ my: 3 }} variant="middle" />
        <Box className={styles.listProperty}>
            <BoxFlex justifyContent="space-between">
                <TextField
                    sx={{ width: 230 }}
                    size='small'
                    id="outlined-required"
                    label="Tên thuộc tính"
                    defaultValue="Kiểu lát"
                />
                <div className={styles.boxAction}>
                    <TextField id="input-with" onSubmit={() => {
                        alert(2);
                    }} size='small' InputProps={{
                        startAdornment: <InputAdornment position="start">
                            <Chip size="small" label="olefin kỹ thuật" onDelete={() => { }} />
                            <Chip size="small" label="tự nhiên kỹ thuật" onDelete={() => { }} />
                        </InputAdornment>,
                    }} />
                    <IconButton sx={{ mx: 2 }}>
                        <Delete />
                    </IconButton>
                </div>
            </BoxFlex>
        </Box>
        <Divider sx={{ my: 3 }} variant="middle" />
    </div>)
}

export default ProductProperty;