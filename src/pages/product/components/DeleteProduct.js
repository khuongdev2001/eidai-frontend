import { useContext, useState, useRef } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { H3 } from "../../../components/layout/Base";
import Modal from "../../../components/layout/Modal";
import axiosCommon from "../../../api/axios";
import { API_DELETE_PRODUCT } from "../../../api/product";
import { LoggedPageContext } from '../../../context/LoggedPageContext';


function DeleteProduct() {
    const ThemeLoggedPageContext = useContext(LoggedPageContext);
    const [isShow, setIshow] = useState(false);
    const productRef = useRef();
    const ThemeProductContext = useContext(ProductContext);
    ThemeProductContext.current.handleDelete = function (id) {
        productRef.current = id;
        setIshow(true);
    }

    function handleDelete() {
        axiosCommon.post(API_DELETE_PRODUCT, { id: productRef.current }).then(() => {
            setIshow(false);
            ThemeProductContext.current.refresh();
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Xóa Sản Phẩm Thành Công"
            })
        })
    }

    return (
        <Modal isShow={isShow}
            onClose={() => setIshow(false)}
            onSubmit={handleDelete}
            size="xl" position="center" btnTextConfirm="Xóa">
            <H3 py={10}>Xác nhận sản phẩm</H3>
        </Modal>)
}

export default DeleteProduct;