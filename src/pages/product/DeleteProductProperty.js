import { useContext, useState, useRef } from "react";
import { ProductPropertyContext } from "../../context/ProductPropertyContext";
import { H3 } from "../../components/layout/Base";
import Modal from "../../components/layout/Modal";
import axiosCommon from "../../api/axios";
import { API_DELETE_PROPERTY } from "../../api/productProperty";
import { LoggedPageContext } from '../../context/LoggedPageContext';


function DeleteProductProperty() {
    const [isShow, setIshow] = useState(false);
    const propertyRef = useRef();
    const ThemeProductPropertyContext = useContext(ProductPropertyContext);
    const ThemeLoggedPageContext = useContext(LoggedPageContext);

    ThemeProductPropertyContext.current.handleDelete = function (id) {
        propertyRef.current = id;
        setIshow(true);
    }

    function handleDelete() {
        axiosCommon.post(API_DELETE_PROPERTY, { id: propertyRef.current }).then(() => {
            ThemeLoggedPageContext.current.snackbar.open({
                message: "Delete Thuộc Tính Thành Công"
            })
            ThemeProductPropertyContext.current.refresh();
            setIshow(false);
        })
    }

    return (
        <Modal isShow={isShow}
            onClose={() => setIshow(false)}
            onSubmit={handleDelete}
            size="xl" position="center" btnTextConfirm="Xóa">
            <H3 py={10}>Xác nhận xóa thuộc tính sản phẩm</H3>
        </Modal>)
}

export default DeleteProductProperty;