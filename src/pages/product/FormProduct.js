import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from "./formProduct.module.scss";
import { BoxFlex, H3, H4 } from "../../components/layout/Base";
import Modal from "../../components/layout/Modal";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import UploadImage from './UploadImage';
import ProductProperty from './ProductProperty';

function FormProduct() {
    const editorRef = useRef();
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
            <div className={styles.box}>
                <H4>Ảnh Sản Phẩm</H4>
                <UploadImage />
            </div>
            <div className={styles.box}>
                <H4 py={10}>Thuộc Tính Sản Phẩm</H4>
                <ProductProperty/>
            </div>
            <div className={[styles.productShortDescription, styles.box].join(" ")}>
                <H4 className={styles.lableField}>Mô tả ngắn</H4>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 50,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
            <div className={[styles.productShortDescription, styles.box].join(" ")}>
                <H4 className={styles.lableField}>Mô tả chi tiết</H4>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    init={{
                        height: 50,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </form>
    </Modal>)
}

export default FormProduct;