import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function ProductEditor({ field, product, setProduct }) {
    const editorRef = useRef();
    return (<Editor
        apiKey="vbzkm84qcbxrq5hsachp4rnckre9eor9ynuypftf4ue9e8g3"
        onInit={(evt, editor) => editorRef.current = editor}
        onBlur={(e) => {
            setProduct((prevState) => {
                return {
                    ...prevState,
                    [field]: e.target.getContent()
                }
            })
        }}
        initialValue={product[field]}
        init={{
            height: 500,
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
    />)
}

export default ProductEditor