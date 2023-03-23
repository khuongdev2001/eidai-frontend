import styles from "./formBanner.module.scss";
import { H3, H4, Thumbnail } from "../../../components/layout/Base";
import Modal from "../../../components/layout/Modal";
import { TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FA from "react-fontawesome";

function FormBanner() {
    return (<div>
        <Modal isShow={false} size="xl" position="center">
            <H3 py={20}>Thêm Banner</H3>
            <form className={styles.formBanner}>
                <TextField id="outlined-basic" label="Tên Banner" variant="outlined" fullWidth size="small" />
                <div className={styles.box}>
                    <H4 py={15}>Ảnh Banner</H4>
                    <div className={styles.boxUpload}>
                        <Thumbnail src="https://eidai.com.vn/img//main_img_01.jpg" />
                        <IconButton className={styles.btn} color="error" aria-label="upload picture" component="label">
                            <FA name="trash" className={styles.btnIcon} />
                        </IconButton>
                    </div>
                </div>
            </form>
        </Modal>
    </div>)
}

export default FormBanner;