import useValidator from "../../../hook/validate"
function FormProductCategory(value, action = false) {
    return useValidator(value, [
        useValidator.isRequired("category_name", "Tên Danh mục không được bỏ trống"),
    ])
}

export const schemas = {
    category_name: "",
    parent_id: "15"
};

export default FormProductCategory;