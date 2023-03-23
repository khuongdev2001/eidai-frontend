import { TextField } from "@mui/material";
import { H3 } from "../../components/layout/Base";
import Modal from "../../components/layout/Modal";

function FormProductProperty() {
    return (<Modal isShow={true} size="xl" position="center">
        <H3 py={20}>Thêm Thuộc Tính Sản Phẩm</H3>
        <form>
            <TextField id="outlined-basic" label="Tên Thuộc Tính Sản Phẩm" variant="outlined" fullWidth size="small" />
        </form>
    </Modal>)
}

export default FormProductProperty;