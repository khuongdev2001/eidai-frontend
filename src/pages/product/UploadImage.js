import FA from "react-fontawesome";
import styles from "./uploadImage.module.scss";
import IconButton from '@mui/material/IconButton';
import { BoxFlex } from "../../components/layout/Base";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function UploadImage() {
    return (<BoxFlex className={styles.listImageProduct}>
        {
            [1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2].map((item) => {
                return (<div className={styles.imageItem}>
                    <img src="https://eidai.com.vn/img/63c0d57d33da1.jpg" />
                    <IconButton className={styles.btn} color="info" aria-label="upload picture" component="label">
                        <FA name="times" className={styles.btnIcon} />
                    </IconButton>
                </div>)
            })
        }
        <IconButton className={[styles.itemUpload, styles.imageItem].join(" ")} color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
        </IconButton>
    </BoxFlex>)
}

export default UploadImage;