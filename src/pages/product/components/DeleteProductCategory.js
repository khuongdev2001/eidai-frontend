import { useContext, useState, useRef } from "react";
import { ProductCategoryContext } from "../../../context/ProductCategoryContext";
import { H3 } from "../../../components/layout/Base";
import Modal from "../../../components/layout/Modal";
import axiosCommon from "../../../api/axios";
import { API_DELETE_CATEGORY } from "../../../api/productCategory";
import { LoggedPageContext } from '../../../context/LoggedPageContext';


function DeleteProductCategory() {
    const [isShow, setIshow] = useState(false);
    const propertyRef = useRef();
    const ThemeLoggedPageContext = useContext(LoggedPageContext);
    const ThemeProductCategoryContext = useContext(ProductCategoryContext);
    ThemeProductCategoryContext.current.handleDelete = function (id) {
        propertyRef.current = id;
        setIshow(true);
    }

    function handleDelete() {
        axiosCommon.post(API_DELETE_CATEGORY, { id: propertyRef.current }).then(() => {
            ThemeProductCategoryContext.current.refresh();
            setIshow(false);
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Xóa Sản Danh Mục Thành Công"
            })
        })
    }

    return (
        <Modal isShow={isShow}
            onClose={() => setIshow(false)}
            onSubmit={handleDelete}
            size="xl" position="center" btnTextConfirm="Xóa">
            <H3 py={10}>Xác nhận xóa danh mục sản phẩm</H3>
        </Modal>)
}

export default DeleteProductCategory;